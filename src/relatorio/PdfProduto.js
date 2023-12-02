import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function produtoPdf(produtos){

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    produtos.sort((a, b) => {
        if (a.nome < b.nome) return -1;
        if (a.nome > b.nome) return 1;
        return 0;
    });
    
    const reportTitle = [
        {
            text: 'Relatório Produtos',
            fontSize: 15,
            bold: true,
            margin: [15,20,0,45]
        }
    ];

    const dados = produtos.map((produtos)=> {
        return [
            {text: produtos.id_produto, fontSize: 9, margin: [0,2,0,2]},
            {text: produtos.nome, fontSize: 9, margin: [0,2,0,2]},
            {text: produtos.quantidade + ',0', fontSize: 9, margin: [0,2,0,2]},
            {text: 'R$' + produtos.valor, fontSize: 9, margin: [0,2,0,2]},
        ]
    });

    const details = [
        {
            table: {
                headerRows: 1,
                widths: ['*', '*', '*','*'],
                body: [
                    [
                        {text: 'Código', style: 'tableHeader', fontSize: 10},
                        {text: 'Nome', style: 'tableHeader', fontSize: 10},
                        {text: 'Quantidade', style: 'tableHeader', fontSize: 10},
                        {text: 'Valor', style: 'tableHeader', fontSize: 10},
                    ],
                    ...dados
                ]
            },
            layout: 'headerLineOnly'
        }
    ];

    function Rodape(currentPage, pageCount){
            const currentDate = new Date().toLocaleDateString('pt-BR');

        return{
            columns: [
            {
            text: currentDate,
            alignment: 'left', 
            fontSize: 9,
            margin: [20, 10, 0, 0] 
            },
            {
                text: currentPage + '/' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10,20,0]
            }
            ],
            margin: [15,0]
    };}

    const docDefinicoes = {
        pageSize: 'A4',
        pageMargins: [15,50,15,40],

        header: [reportTitle],
        content: [details],
        footer: Rodape
    }

    pdfMake.createPdf(docDefinicoes).download('Produtos');


}
export default produtoPdf;