# Trilhão Paracuru Off Road

Site de divulgação do 7º Trilhão Paracuru Off Road. Apresenta o evento, programação, categorias, kits, galeria e patrocinadores em uma interface estática.

## Estrutura e execução

O ponto de entrada é `index.html`. O projeto usa HTML, CSS, JavaScript e recursos visuais locais, sem etapa de build de aplicação.

```sh
git clone https://github.com/iamnothuman7/trilhaoparacuru.git
cd trilhaoparacuru
python -m http.server 8000 --bind 127.0.0.1
```

Abra `http://127.0.0.1:8000/` mantendo a estrutura original das pastas de imagens e scripts.

## Cuidados de manutenção

- Datas, programação, preços e disponibilidade são conteúdo do evento e precisam ser confirmados antes de uma nova publicação.
- Confira links de inscrição e contato sem realizar compras ou enviar dados reais durante testes.
- O HTML contém integração de rastreamento com Meta Pixel. Revise consentimento e configuração antes de reaproveitar a página.
- Verifique imagens, navegação, contraste, teclado e telas pequenas. Ainda não há suíte automatizada de testes.

## Uso dos materiais

Este repositório documenta a implementação da interface, não concede direitos sobre fotos, marcas de patrocinadores ou identidade do evento. Não há licença de redistribuição declarada.
