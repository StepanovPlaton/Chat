import { AnySchema } from "yup";

export type RequestCacheOptions = {
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

type GetRequestOptions = RequestCacheOptions & {
  headers?: HeadersInit;
};

type RequestOptions = GetRequestOptions & {
  body?: BodyInit | object;
  stringify?: boolean;
};

export abstract class HTTPService {
  private static deepUndefinedToNull(o?: object): object | undefined {
    if (Array.isArray(o)) return o;
    if (o)
      return Object.fromEntries(
        Object.entries(o).map(([k, v]) => {
          if (v === undefined) return [k, null];
          if (typeof v === "object") return [k, this.deepUndefinedToNull(v)];
          return [k, v];
        })
      );
  }

  public static async request<Y extends AnySchema>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    schema: Y,
    options?: RequestOptions
  ) {
    return await fetch(
      `${process.env.NEXT_PUBLIC_BASE_PROTOCOL}://` +
        `${process.env.NEXT_PUBLIC_BASE_DOMAIN}:` +
        `${process.env.NEXT_PUBLIC_BASE_PORT}` +
        `${process.env.NEXT_PUBLIC_API_PATTERN}${url}`,
      {
        method: method,
        headers: {
          accept: "application/json",
          ...((options?.stringify ?? true) != true
            ? {}
            : { "Content-Type": "application/json" }),
          ...options?.headers,
        },
        body:
          (options?.stringify ?? true) != true
            ? (options?.body as BodyInit)
            : JSON.stringify(
                this.deepUndefinedToNull(options?.body as object | undefined)
              ),
        cache: options?.cache ?? options?.next ? undefined : "no-cache",
        next: options?.next ?? {},
      }
    )
      .then((r) => {
        if (r && r.ok) return r;
        else throw Error("Response ok = false");
      })
      .then((r) => r.json())
      .then(async (d) => await schema.validate(d))
      .catch((e) => {
        console.error(e);
        return null;
      });
  }

  public static async get<Y extends AnySchema>(
    url: string,
    schema: Y,
    options?: GetRequestOptions
  ) {
    return await this.request<Y>("GET", url, schema, options);
  }

  public static async post<Y extends AnySchema>(
    url: string,
    schema: Y,
    options?: RequestOptions
  ) {
    return await this.request<Y>("POST", url, schema, options);
  }

  public static async put<Y extends AnySchema>(
    url: string,
    schema: Y,
    options?: RequestOptions
  ) {
    return await this.request<Y>("PUT", url, schema, options);
  }
}
