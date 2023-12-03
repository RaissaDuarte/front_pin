import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function funcionarioPdf(funcionarios){

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    funcionarios.sort((a, b) => {
        if (a.nome < b.nome) return -1;
        if (a.nome > b.nome) return 1;
        return 0;
    });
    
    const reportTitle = [
        {
            text: 'Relatório Funcionarios',
            fontSize: 15,
            bold: true,
            margin: [15,20,0,45]
        }
    ];

    const dados = funcionarios.map((funcionarios)=> {
        return [
            {text: funcionarios.id, fontSize: 9, margin: [0,2,0,2]},
            {text: funcionarios.nome, fontSize: 9, margin: [0,2,0,2]},
            {text: funcionarios.cpf, fontSize: 9, margin: [0,2,0,2]},
            {text: funcionarios.telefone, fontSize: 9, margin: [0,2,0,2]},
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
                        {text: 'CPF', style: 'tableHeader', fontSize: 10},
                        {text: 'Telefone', style: 'tableHeader', fontSize: 10},
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

    pdfMake.createPdf(docDefinicoes).download('funcionarios');


}
export default funcionarioPdf;