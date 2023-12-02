import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function clientePdf(clientes){

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    clientes.sort((a, b) => {
        if (a.nome < b.nome) return -1;
        if (a.nome > b.nome) return 1;
        return 0;
    });
    
    const reportTitle = [
        {
            text: 'Relatório Clientes',
            fontSize: 15,
            bold: true,
            margin: [15,20,0,45]
        }
    ];

    const dados = clientes.map((clientes)=> {
        return [
            {text: clientes.id_cliente, fontSize: 9, margin: [0,2,0,2]},
            {text: clientes.nome, fontSize: 9, margin: [0,2,0,2]},
            {text: clientes.cpf_cnpj, fontSize: 9, margin: [0,2,0,2]},
            {text: clientes.telefone, fontSize: 9, margin: [0,2,0,2]},
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

    pdfMake.createPdf(docDefinicoes).download('clientes');


}
export default clientePdf;