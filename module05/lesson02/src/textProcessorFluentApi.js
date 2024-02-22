/**
 * O objetivo do Fluent API eh executar tarefas
 * como um pipeline, step by step,
 * e no fim, chama o build. Muito similar ao padrao Builder
 * a diferenca que aqui eh sobre processos, o Builder sobre
 * construcao de objetos
 */
class TextProcessorFluentAPI {
  //propriedade privada!
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    /**
     * ?<= fala que vai extrair os dados que virao depois desse grupo
     * [contratante|contratada] ou um ou outro (e tem a flag no fim para pegar maiuscula e minuscula)
     * :\s{1} vai procurar o caracter literal dois pontos seguido de espaco
     * tudo acima dentro de parenteses para falar "vamos pegar dai pra frente"
     *
     * (?!\s) negative look around, vai ignorar os contratantes do fim do documento
     *
     * .*\n pega qualquer coisa ate o primeiro \n
     * .*? non greety, esse ? faz com que ele pare na primeira recorrencia, assim ele evita ficar em loop
     *
     * $ informar que a pesquisa acaba no fim da linha
     * g -> global
     * m -> multiline
     * i -> case insensitive
     */
    const matchPerson =
      /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim;

    const onlyPerson = this.#content.match(matchPerson);

    this.#content = onlyPerson;

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
