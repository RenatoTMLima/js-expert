import Http from "http";

export async function InjectHttpInterceptor() {
  const oldEmit = Http.Server.prototype.emit;

  Http.Server.prototype.emit = function (...args) {
    const [type, req, res] = args;

    if (type === "request") {
      res.setHeader("X-Instrumented-By", "RenatoTakao");
    }

    return oldEmit.apply(this, args);
  };
}
