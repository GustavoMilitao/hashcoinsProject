(function () {
    'use strict';

    angular
        .module('app.BTC', ['angularUtils.directives.dirPagination'])
        .controller('BTCController', BTCController);

    function BTCController($scope) {
        $scope.semDados = false;
        $scope.dadosCalculo = {};
        // $scope.dadosGrafico = getData(213, 0.00002811, 0.86, 1.5, 18431, 3.29, 0.00014256, 0.0035);
        // $scope.dadosGrafico = getData(327, 0.00006302, 0.32, 1.5, 17952, 3.29, 0.000149759, 0.0035);
        $scope.dadosGrafico = {};
        $scope.labelGrafico = [];
        $scope.graficos = [];


        $scope.chartColors = {
            red: 'rgb(255, 99, 132)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            green: 'rgb(75, 192, 192)',
            blue: 'rgb(54, 162, 235)',
            purple: 'rgb(153, 102, 255)',
            grey: 'rgb(201, 203, 207)'
        };

        $scope.plotar = function () {
            $scope.finalizarGraficos();
            $scope.dadosGrafico = getData(
                parseFloat($scope.dadosCalculo.totalDiasInvestimento.replace(',', '.')),
                parseFloat($scope.dadosCalculo.BTCBalanco.replace(',', '.')),
                parseFloat($scope.dadosCalculo.hashrate.replace(',', '.')),
                parseFloat($scope.dadosCalculo.precoContratoDolar.replace(',', '.')),
                parseFloat($scope.dadosCalculo.cotacaoAtualBitcoinDolar.replace(',', '.')),
                parseFloat($scope.dadosCalculo.cotacaoDolar.replace(',', '.')),
                parseFloat($scope.dadosCalculo.rentabilidadeTHzDia.replace(',', '.')),
                parseFloat($scope.dadosCalculo.taxaManutencaoDollar.replace(',', '.')));
            $scope.drawChart1();
            $scope.drawChart2();
            $scope.drawChart3();
            $scope.drawChart4();
        }

        $scope.finalizarGraficos = function () {
            $scope.graficos.forEach(function (element) {
                element.destroy();
            });
        }

        $scope.drawChart1 = function () {
            var canvas = document.getElementById("chart1");
            //var canvas = document.querySelector('#myChart');
            var context = canvas.getContext('2d');
            context.fillStyle = "#FFFFFF";
            context.fillRect(0, 0, 200, 200);

            var myLineChart = new Chart(canvas, {
                type: 'line',
                data:
                {
                    datasets: [
                        //     {
                        //     showLine: true,
                        //     data: $scope.dadosGrafico.projecaoVlrDiaReal,
                        //     label: 'Projeção Valor Dia R$ (Real)',
                        //     fill: false,
                        //     borderColor: $scope.chartColors.red,
                        //     backgroundColor: $scope.chartColors.red,
                        // },
                        // {
                        //     showLine: true,
                        //     data: $scope.dadosGrafico.projecaoVlrDiaDollar,
                        //     label: 'Projeção Valor Dia $ (Dollar)',
                        //     fill: false,
                        //     borderColor: $scope.chartColors.orange,
                        //     backgroundColor: $scope.chartColors.orange,
                        // },
                        // {
                        //     showLine: true,
                        //     data: $scope.dadosGrafico.projecaoThz,
                        //     label: 'Projeção THZ',
                        //     fill: false,
                        //     borderColor: $scope.chartColors.yellow,
                        //     backgroundColor: $scope.chartColors.yellow,
                        // },
                        {
                            showLine: true,
                            data: $scope.dadosGrafico.projecaoSaqueReal,
                            label: 'Projeção saque mensal (Líquido) R$ (Real)',
                            fill: false,
                            borderColor: $scope.chartColors.green,
                            backgroundColor: $scope.chartColors.green,

                        },
                        {
                            showLine: true,
                            data: $scope.dadosGrafico.projecaoSaqueDollar,
                            label: 'Projeção saque mensal (Líquido) $ (Dollar)',
                            fill: false,
                            borderColor: $scope.chartColors.blue,
                            backgroundColor: $scope.chartColors.blue,

                        }],
                    labels: $scope.dadosGrafico.dias
                },
                options: {
                    responsive: true,
                    chartArea: {
                        backgroundColor: '#FFFFFF'
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                return tooltipItem.datasetIndex % 2 != 0 ? ' $ ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                                    : ' R$ ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            }
                        }
                    },
                    title: {
                        display: true,
                        position: 'bottom'
                    },
                    legend: {
                        // since you're providing your own legend
                        display: true,
                        position: 'right'
                    },
                }
            });
            $scope.graficos.push(myLineChart);
        }

        $scope.drawChart2 = function () {
            var canvas = document.getElementById("chart2");
            //var canvas = document.querySelector('#myChart');
            var context = canvas.getContext('2d');
            context.fillStyle = "#FFFFFF";
            context.fillRect(0, 0, 200, 200);

            var myLineChart = new Chart(canvas, {
                type: 'line',
                data:
                {
                    datasets: [{
                        showLine: true,
                        data: $scope.dadosGrafico.projecaoVlrDiaReal,
                        label: 'Projeção Valor Dia R$ (Real)',
                        fill: false,
                        borderColor: $scope.chartColors.red,
                        backgroundColor: $scope.chartColors.red,
                    },
                    {
                        showLine: true,
                        data: $scope.dadosGrafico.projecaoVlrDiaDollar,
                        label: 'Projeção Valor Dia $ (Dollar)',
                        fill: false,
                        borderColor: $scope.chartColors.orange,
                        backgroundColor: $scope.chartColors.orange,
                    }
                        //,
                        // {
                        //     showLine: true,
                        //     data: $scope.dadosGrafico.projecaoThz,
                        //     label: 'Projeção THZ',
                        //     fill: false,
                        //     borderColor: $scope.chartColors.yellow,
                        //     backgroundColor: $scope.chartColors.yellow,
                        // },
                        // {
                        //     showLine: true,
                        //     data: $scope.dadosGrafico.projecaoSaqueReal,
                        //     label: 'Projeção saque mensal (Líquido) R$ (Real)',
                        //     fill: false,
                        //     borderColor: $scope.chartColors.green,
                        //     backgroundColor: $scope.chartColors.green,

                        // },
                        // {
                        //     showLine: true,
                        //     data: $scope.dadosGrafico.projecaoSaqueDollar,
                        //     label: 'Projeção saque mensal (Líquido) $ (Dollar)',
                        //     fill: false,
                        //     borderColor: $scope.chartColors.blue,
                        //     backgroundColor: $scope.chartColors.blue,

                        // }
                    ],
                    labels: $scope.dadosGrafico.dias
                },
                options: {
                    responsive: true,
                    chartArea: {
                        backgroundColor: '#FFFFFF'
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                return tooltipItem.datasetIndex % 2 != 0 ? ' $ ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                                    : ' R$ ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            }
                        }
                    },
                    title: {
                        display: true,
                        position: 'bottom'
                    },
                    legend: {
                        // since you're providing your own legend
                        display: true,
                        position: 'right'
                    },
                }
            });
            $scope.graficos.push(myLineChart);
        }

        $scope.drawChart3 = function () {
            var canvas = document.getElementById("chart3");
            //var canvas = document.querySelector('#myChart');
            var context = canvas.getContext('2d');
            context.fillStyle = "#FFFFFF";
            context.fillRect(0, 0, 200, 200);

            var myLineChart = new Chart(canvas, {
                type: 'line',
                data:
                {
                    datasets: [{
                        showLine: true,
                        data: $scope.dadosGrafico.balancoReal,
                        label: 'Balanço Dia R$ (Real)',
                        fill: false,
                        borderColor: $scope.chartColors.red,
                        backgroundColor: $scope.chartColors.red,
                    },
                    {
                        showLine: true,
                        data: $scope.dadosGrafico.balancoDollar,
                        label: 'Balanço Dia $ (Dollar)',
                        fill: false,
                        borderColor: $scope.chartColors.orange,
                        backgroundColor: $scope.chartColors.orange,
                    }
                        //,
                        // {
                        //     showLine: true,
                        //     data: $scope.dadosGrafico.projecaoThz,
                        //     label: 'Projeção THZ',
                        //     fill: false,
                        //     borderColor: $scope.chartColors.yellow,
                        //     backgroundColor: $scope.chartColors.yellow,
                        // },
                        // {
                        //     showLine: true,
                        //     data: $scope.dadosGrafico.projecaoSaqueReal,
                        //     label: 'Projeção saque mensal (Líquido) R$ (Real)',
                        //     fill: false,
                        //     borderColor: $scope.chartColors.green,
                        //     backgroundColor: $scope.chartColors.green,

                        // },
                        // {
                        //     showLine: true,
                        //     data: $scope.dadosGrafico.projecaoSaqueDollar,
                        //     label: 'Projeção saque mensal (Líquido) $ (Dollar)',
                        //     fill: false,
                        //     borderColor: $scope.chartColors.blue,
                        //     backgroundColor: $scope.chartColors.blue,

                        // }
                    ],
                    labels: $scope.dadosGrafico.diasBalanco
                },
                options: {
                    responsive: true,
                    chartArea: {
                        backgroundColor: '#FFFFFF'
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                return tooltipItem.datasetIndex % 2 != 0 ? ' $ ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                                    : ' R$ ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            }
                        }
                    },
                    title: {
                        display: true,
                        position: 'bottom'
                    },
                    legend: {
                        // since you're providing your own legend
                        display: true,
                        position: 'right'
                    },
                }
            });
            $scope.graficos.push(myLineChart);
        }

        $scope.drawChart4 = function () {
            var canvas = document.getElementById("chart4");
            //var canvas = document.querySelector('#myChart');
            var context = canvas.getContext('2d');
            context.fillStyle = "#FFFFFF";
            context.fillRect(0, 0, 200, 200);

            var myLineChart = new Chart(canvas, {
                type: 'line',
                data:
                {
                    datasets: [{
                        showLine: true,
                        data: $scope.dadosGrafico.projecaoThz,
                        label: 'Projeção THZ',
                        fill: false,
                        borderColor: $scope.chartColors.yellow,
                        backgroundColor: $scope.chartColors.yellow,
                    }],
                    labels: $scope.dadosGrafico.dias
                },
                options: {
                    responsive: true,
                    chartArea: {
                        backgroundColor: '#FFFFFF'
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + ' THZ';
                            }
                        }
                    },
                    title: {
                        display: true,
                        position: 'bottom'
                    },
                    legend: {
                        // since you're providing your own legend
                        display: true,
                        position: 'right'
                    },
                }
            });
            $scope.graficos.push(myLineChart);
        }

    }

    // angular.element(document).ready(function() {
    //     angular.bootstrap(document.getElementById("consulta_item"), ['app.prestadores.item']);
    // });
})();


Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

var getData = function (totalDiasInvestimento, BTCBalanco, hashrate, precoContratoDolar, cotacaoAtualBitcoinDolar, cotacaoDolar, rentabilidadeTHzDia, taxaManutencaoDollar) {

    var contractPrice = precoContratoDolar / cotacaoAtualBitcoinDolar;
    hashrate = hashrate * 100;
    rentabilidadeTHzDia = rentabilidadeTHzDia / 100;

    var date = new Date();
    var dadosProjecao = {
        dias: [],
        diasBalanco: [],
        balancoReal: [],
        balancoDollar: [],
        projecaoThz: [],
        projecaoVlrDiaReal: [],
        projecaoVlrDiaDollar: [],
        projecaoSaqueReal: [],
        projecaoSaqueDollar: []
    };
    for (var i = 0; i < totalDiasInvestimento; i++) {
        // console.log('Dia ' + (i + 1) + ' - Valor total na carteira: $' + ((precoContratoDolar / contractPrice) * BTCBalanco).toFixed(2) + ' | R$' + (((1.4 / contractPrice) * BTCBalanco) * cotacaoDolar).toFixed(2) + '. Valor ganho hoje : $' + ((precoContratoDolar / contractPrice) * (hashrate * rentabilidadeTHzDia)).toFixed(2) + ' | R$' + (((precoContratoDolar / contractPrice) * (hashrate * rentabilidadeTHzDia)) * cotacaoDolar).toFixed(2));
        BTCBalanco += hashrate * rentabilidadeTHzDia - (hashrate * (taxaManutencaoDollar / cotacaoAtualBitcoinDolar));
        if (BTCBalanco * 30 >= 0.0107) {
            //     console.log('MÍNIMO DE SAQUE - Se você parar AQUI, conseguirá sacar $ '
            //         + (((hashrate * rentabilidadeTHzDia * 30) - 0.0007)
            //             * cotacaoAtualBitcoinDolar).toFixed(2)
            //         + ' ou R$ ' + (((hashrate * rentabilidadeTHzDia * 30) - 0.0007) * cotacaoAtualBitcoinDolar * cotacaoDolar).toFixed(2));
            dadosProjecao.projecaoSaqueReal.push(
                parseFloat((((hashrate * rentabilidadeTHzDia * 30) - 0.0007) * cotacaoAtualBitcoinDolar * cotacaoDolar).toFixed(2)),
            );
            dadosProjecao.projecaoSaqueDollar.push(
                parseFloat((((hashrate * rentabilidadeTHzDia * 30) - 0.0007) * cotacaoAtualBitcoinDolar).toFixed(2))
            );
        } else {
            dadosProjecao.projecaoSaqueReal.push(0);
            dadosProjecao.projecaoSaqueDollar.push(0);
        }
        //console.log('Hashrate antes da compra: ' + hashrate / 100 + 'TH/s. Hashrate compado hoje: ' + (parseInt(BTCBalanco / contractPrice)) / 100 + 'TH/s.\n\n');
        if (BTCBalanco / contractPrice >= 1) {
            if (i % 7 == 0) {
                dadosProjecao.balancoReal.push(parseFloat(BTCBalanco * cotacaoAtualBitcoinDolar * cotacaoDolar));
                dadosProjecao.balancoDollar.push(parseFloat(BTCBalanco * cotacaoAtualBitcoinDolar));
                dadosProjecao.diasBalanco.push(date.addDays(i).toLocaleDateString('pt-BR'));
            }
            hashrate += parseInt(BTCBalanco / contractPrice);
            BTCBalanco -= contractPrice * parseInt(BTCBalanco / contractPrice);
            if (i % 7 == 0) {
                dadosProjecao.balancoReal.push(parseFloat(BTCBalanco * cotacaoAtualBitcoinDolar * cotacaoDolar));
                dadosProjecao.balancoDollar.push(parseFloat(BTCBalanco * cotacaoAtualBitcoinDolar));
            }
        }

        dadosProjecao.projecaoVlrDiaReal.push(
            parseFloat(((hashrate * rentabilidadeTHzDia - (hashrate * (taxaManutencaoDollar / cotacaoAtualBitcoinDolar))) * cotacaoAtualBitcoinDolar * cotacaoDolar)));
        dadosProjecao.projecaoVlrDiaDollar.push(parseFloat((hashrate * rentabilidadeTHzDia - (hashrate * (taxaManutencaoDollar / cotacaoAtualBitcoinDolar))) * cotacaoAtualBitcoinDolar));

        dadosProjecao.projecaoThz.push(parseFloat(hashrate / 100));
        dadosProjecao.dias.push(date.addDays(i).toLocaleDateString('pt-BR'));
    }
    // return hashrate;
    return dadosProjecao;
}


// var getValueOfInvestment = function (totalDiasInvestimento, BTCBalanco, hashrate, precoContratoDolar, cotacaoAtualBitcoinDolar, cotacaoDolar, rentabilidadeTHzDia, intervaloDeDiasCalculo, taxaManutencaoDollar) {
//     var data = 
//getData(totalDiasInvestimento, BTCBalanco, hashrate, precoContratoDolar, cotacaoAtualBitcoinDolar, cotacaoDolar, rentabilidadeTHzDia, taxaManutencaoDollar);
//     // var result = {
//     //     valueBitcoins: contCount * (rentabilidadeTHzDia / 100) * intervaloDeDiasCalculo,
//     //     valueDolar: (contCount * (rentabilidadeTHzDia / 100) * intervaloDeDiasCalculo) * cotacaoAtualBitcoinDolar,
//     //     valueReal: (contCount * (rentabilidadeTHzDia / 100) * intervaloDeDiasCalculo) * cotacaoAtualBitcoinDolar * cotacaoDolar
//     // };
//     // return 'Após ' + intervaloDeDiasCalculo + ' dias de término do período de investimento: \n' + 'Valor em Bitcoins: B ' + result.valueBitcoins.toFixed(8) + '\nValor em Dólares: $ ' + result.valueDolar.toFixed(2) + '\nValor em Reais: R$ ' + result.valueReal.toFixed(2);
// }

// var dados = getData(213, 0.00002811, 0.86, 1.5, 18431, 3.29, 0.00014256, 0.0035);










function convertHTMLTableToJSON(htmlString) {
    var delimiter = ",";
    var noMultiLines = true;
    var forceHeader = false;
    whichTable = "0";
    var bQuotes = false;
    var removeTags = true;
    var html = document.getElementById('divHtml');
    html.innerHTML = htmlString.replace(/<script/gmi, "<xxxxx");
    html.innerHTML = html.innerHTML.replace(/<style/gmi, "<yyyyy");

    var s = "";
    var cells;
    var value;
    var tbl = html.getElementsByTagName('table');
    var cnt = tbl.length;
    var re = new RegExp("<\/?\\w+((\\s+\\w+(\\s*=\\s*(?:\".*?\"|'.*?'|[^'\">\\s]+))?)+\\s*|\\s*)\/?>", 'igm');
    var headerFound = false;
    for (var j = 0; j < tbl.length; j++) {
        if (("" + (j + 1)) != whichTable && whichTable != "0") continue;
        rows = tbl[j].getElementsByTagName('tr');
        for (var k = 0; k < rows.length; k++) {
            if (k == 0) {
                cells = rows[k].getElementsByTagName('th');
                if (cells && cells.length > 0) headerFound = true;
            }
            if ('querySelectorAll' in document) {
                cells = rows[k].querySelectorAll('td,th');
            } else {
                cells = rows[k].getElementsByTagName('td');
                if (!cells || cells.length == 0) {
                    cells = rows[k].getElementsByTagName('th');
                }
            }

            for (var n = 0; n < cells.length; n++) {
                value = cells[n].innerHTML;
                if (value == null) value = ""; else value += "";
                value = value.replace(/\r\n|\r|\n/gmi, ' ');
                if (noMultiLines) value = value.replace(/\n|<br>|<br\/>|<br \/>/gmi, '\n');
                //else value = value.replace(/\r\n|\r|\n|<br>|<br\/>|<br \/>/gmi,'\n');
                if (removeTags) value = value.replace(re, '');
                value = _.unescape(value);
                value = value.replace(/&nbsp;/gmi, " ");
                value = value.trim();
                if (bQuotes) {
                    s += '"' + value.replace(/"/gmi, '""') + '"' + delimiter;
                }
                else {
                    s += value.toCsv(delimiter, '"') + delimiter;
                }
            }
            s = s.slice(0, delimiter.length * -1); // remove last delimiter
            s += "\n";
        }
    }
    // s contains csv, convert that to JSON.
    var tableString = s;
    if (cnt < 1 && htmlString != "") {
        window.alert('No TABLE tag found in HTML. Please check your input.');
    }
    var options = { "global": [] };
    options.forceWrap = false;
    options.nullIsNull = true;
    options.useFieldsData = false;
    options.fldPropName = "fields";
    options.dataPropName = "data";

    CSV.isFirstRowHeader = headerFound || forceHeader;
    CSV.parse(tableString);
    options.isKeyed = false;
    var a = JSON.parse(csvToJSON(CSV, options));
    a.pop();
    return a;
}