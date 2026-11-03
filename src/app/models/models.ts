export interface Categoria {
  idCategoria: number;
  nome: string;
}

export interface Item {
  idItem?: number;
  nome: string;
  idCategoria: number;
  descricao: string;
  preco: number;
  tipo: 'PRODUTO' | 'SERVICO';
  ativo: boolean;
}

export interface Endereco {
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
}

export interface Pessoa {
  idPessoa?: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  sexo: string;
  email: string;
  telefone: string;
  endereco?: Endereco;
}

export interface ItemCarrinho {
  item: Item;
  quantidade: number;
}

export interface AtendimentoItem {
  idItem: number;
  quantidade: number;
  valorUnitario: number;
  idFuncionario?: number;
}

export interface Atendimento {
  idAtendimento?: number;
  idPessoa: number;
  dataAtendimento: string;
  valorTotal: number;
  status: 'Aberto' | 'Em processamento' | 'Concluido' | 'Cancelado';
  itens: AtendimentoItem[];
}

export interface EntradaProduto {
  idEntrada?: number;
  idItem: number;
  dataEntrada: string;
  quantidade: number;
  unidade: string;
  valorUnitarioEntrada: number;
}

export interface Estoque {
  idItem: number;
  nomeItem: string;
  descricaoItem: string;
  preco: number;
  precoVenda: number;
  unidade: string;
  categoria: string;
  quantidadeEstoque: number;
  ativo: boolean;
}