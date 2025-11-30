import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DownloadArquivoService {

  constructor() { }

  // pega o arquivo e faz o download no navegador do usuario
  // blob = conteudo / filename = nome do arquivo (relatorio.pdf)
  baixarArquivo(blob: Blob, filename: string): void {

    // url temporaria para o arquivo
    const url = window.URL.createObjectURL(blob);

    // cria uma tag ancora (a)
    const a = document.createElement('a');
    a.href = url;
    a.download = filename; // nome do arquivo

    // coloca o link no body da pagina
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // tira a url
    window.URL.revokeObjectURL(url);
  }

  // gera o nome para o relatorio de capacidade
  // concatena um timestamp now para evitar duplicidade de nome
  gerarNomeRelatorioCapacidade(): string {
    const data = new Date();
    const dataLocal = new Date(data.getTime() - (data.getTimezoneOffset() * 60000));
    return 'relatorio-capacidade-' + dataLocal.toISOString().slice(0, 19) + '.pdf'
  }

  // gera o nome para o relatorio de velocidade
  // concatena um timestamp now para evitar duplicidade de nome
  gerarNomeRelatorioVelocidade(): string {
    const data = new Date();
    const dataLocal = new Date(data.getTime() - (data.getTimezoneOffset() * 60000));
    return 'relatorio-velocidade-' + dataLocal.toISOString().slice(0, 19) + '.pdf'
  }

  // gera o nome para o relatorio de comparacao
  // concatena um timestamp now para evitar duplicidade de nome
  gerarNomeRelatorioComparacao(): string {
    const data = new Date();
    const dataLocal = new Date(data.getTime() - (data.getTimezoneOffset() * 60000));
    return 'relatorio-comparacao-' + dataLocal.toISOString().slice(0, 19) + '.pdf'
  }
}
