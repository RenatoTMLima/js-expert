export default class Marketing {
  update({ id, userName }) {
    // importante: lembrar que o update eh responsavel por gerenciar seus erros/exceptions
    // nao deve ter await no notify porque a responsabilidade do notify eh so emitir eventos
    // so notificar todo mundo
    console.log(
      `[${id}]: [marketing] will send a welcome email to [${userName}]`
    );
  }
}
