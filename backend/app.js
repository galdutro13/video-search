const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const MiniSearch = require("minisearch");

const videos = [
    {
        id: 1,
        title: 'Biossensor para detecção de anticorpos da COVID-19',
        palavrasChave: 'Biotecnologia, Bioquímica, Análise Clínica, Anticorpos, COVID-19',
        GPTChaves: 'Imunologia, Diagnóstico, Detecção de biomarcadores, Testes rápidos, Tecnologia médica',
        videoName: 'V01'
    },
    {
        id: 2,
        title: 'Micropad à base de papel que permite a detecção de melatonina em comprimidos',
        palavrasChave: 'Bioquímica, Farmacologia, Biossensor, Hormônios, Melatonina',
        GPTChaves: 'Monitoramento de medicamentos, Análise farmacêutica',
        videoName: 'V02'
    },
    {
        id: 3,
        title: 'Dispositivo de papel para teste do pezinho',
        palavrasChave: 'Biotecnologia; bioquímica; análise sanguínea; teste do pezinho',
        GPTChaves: 'Triagem neonatal, bioquímica',
        videoName: 'V03'
    },
    {
        id: 4,
        title: 'Microchip para mimetizar a corrente sanguínea e fazer testes de citotoxicidade',
        palavrasChave: 'Bioquímica; Farmacologia; Citotoxicidade; Células',
        GPTChaves: 'Microfluídica, fluidos biológicos',
        videoName: 'V04'
    },
    {
        id: 5,
        title: 'Método de preparação de quitosanas modificadas como veículos para transporte de metais bioativos',
        palavrasChave: 'Química; Bioquímica; Quitosanas; Bactericidas; Fungicidas',
        GPTChaves: 'Nanopartículas, medicamentos',
        videoName: 'V05'
    },
    {
        id: 6,
        title: 'Nova técnica de preparação da N-N’-DICICLOHEXILSULFAMIDA que possui propriedades ansiolíticas e anticonvulsivantes',
        palavrasChave: 'Bioquímica; Farmacologia; Química Verde; Análise Térmica; Ansiolíticos; Anticonvulsivantes',
        GPTChaves: 'Composto farmacêutico, Síntese sustentável',
        videoName: 'V06'
    },
    {
        id: 7,
        title: 'Baterias de sódio como alternativas para baterias em dispositivos',
        palavrasChave: 'Física; Química de materiais; energia verde; baterias; eletrólitos',
        GPTChaves: 'Fontes renováveis, Eletrólitos sólidos',
        videoName: 'V07'
    },
    {
        id: 8,
        title: 'CEINFAR - Centro de Inovação em Fármacos para trabalho em processos iniciais de descoberta e desenvolvimento de fármacos e biofármacos',
        palavrasChave: 'Ciências Biomédicas; Farmacologia; Biofármacos; Triagem fenotípica; centro de inovação',
        GPTChaves: 'compostos bioativos',
        videoName: 'V08'
    },
    {
        id: 9,
        title: 'Novo catalisador para produção de metanol e conversão de CO2',
        palavrasChave: 'Etanol, CO2, ciclo de carbono, metanol, bioetanol',
        GPTChaves: 'Conversão de biomassa, química verde', 
        videoName: 'V09'
    },
    {
        id: 10,
        title: 'Resinas com potencial antimicrobiano para aumentar a durabilidade de restaurações dentárias',
        palavrasChave: 'resina estética, cárie, antimicrobiano, resinas dentárias, quitosana',
        GPTChaves: 'Odontologia',
        videoName: 'V10'
    },
    {
        id: 11,
        title: 'Nanocompósitos magneto-luminescentes para produção de óxido de ferro nanoestruturado',
        palavrasChave: 'ensaios não destrutivos, nanopartículas, óxido de ferro, magneto-luorescentes, metal chek',
        GPTChaves: 'Caracterização de materiais',
        videoName: 'V11'
    },
    {
        id: 12,
        title: 'Spiron - Nanopartícula para uso em agente de contraste de ressonâncias magnéticas',
        palavrasChave: 'nanopartícula, ressonância magnética, agente de contraste, gadolínio, diagnóstico de tumor, agente de contraste teranóstico',
        GPTChaves: 'Nanomedicina, Teranóstica',
        videoName: 'V12'
    },
    {
        id: 13,
        title: 'Aplicativo de realidade aumentada para ensino e aprendizagem de geometria molecular',
        palavrasChave: 'realidade aumentada, educação, modelos tridimensionais, geometria molecular',
        GPTChaves: 'Tecnologia educacional, Interatividade digital, Aprendizado imersivo',
        videoName: 'V13'
    },
    {
        id: 14,
        title: 'RGCILex - Plataforma unificada que compila a legislação de petróleo e gás natural no Brasil',
        palavrasChave: 'petróleo, gás, energia limpa, legislação, mudança climática',
        GPTChaves: 'Políticas ambientais',
        videoName: 'V14'
    },
    {
        id: 15,
        title: 'SOPED - Sistema de orientação ao pé diabético',
        palavrasChave: 'Neuropatia diabética, Autoavaliação, Gamificação, Exercício para os pés, Software educativo, Perdas sensoriais',
        GPTChaves: 'diabetes, Autocuidado, Educação em saúde, Prevenção de complicações',
        videoName: 'V15'
    },
    {
        id: 16,
        title: 'Sistema de expressão para redução no tempo de identificação na etapa pré-clínica para identificação de novos antibióticos para o combate a resistência bacteriana',
        palavrasChave: 'Ação inibitória, Alvo molecular, Antibióticos, Atividade antimicrobiana, Biossensores',
        GPTChaves: 'Descoberta de medicamentos',
        videoName: 'V16'
    },
    {
        id: 17,
        title: 'Processo de concentração de efluentes agroindustriais pela redução do teor de água e usos para esse concentrado e seus subprodutos',
        palavrasChave: 'Sucroalcooleiro, Efluentes, Agroindustriais, Vinhaça, Excedente',
        GPTChaves: 'Gestão ambiental',
        videoName: 'V17'
    }, 
    {
        id: 18,
        title: 'Método para encapsular nanopartículas com antocianinas para indústrias de alimentos e farmacêuticos para coloração e uso como antioxidantes',
        palavrasChave: ' Antocianinas, Coloração, Pigmentos funcionais, Antioxidante',
        GPTChaves: 'Nanotecnologia aplicada',
        videoName: 'V18'
    },
    {
        id: 19,
        title: 'Máscara facial oronasal para resolver a apneia',
        palavrasChave: 'Apneia, Diodos fluídicos, Máscara facial, Impressão 3D',
        GPTChaves: 'Distúrbios do sono, CPAP',
        videoName: 'V19'
    },
    {
        id: 20,
        title: 'Composição alimentícia contendo Mel de cacau para substituição total ou parcial da sacarose em chocolates e gelados comestíveis',
        palavrasChave: 'Composição alimentícia, Substituição, Chocolate',
        GPTChaves: 'Alternativas de açúcar',
        videoName: 'V20'
    },
    {
        id: 21,
        title: 'Sistema de gerenciamento de redes elétricas multi fontes',
        palavrasChave: 'Gerenciamento, Otimização, Redes elétricas, Gerador Híbrido, Algoritmo',
        GPTChaves: 'Eficiência energética, controle de redes, dados em tempo real',
        videoName: 'V21'
    },
    {
        id: 22,
        title: 'Posicionadores de volume reduzido para radiografias de dentes posteriores',
        palavrasChave: 'Molares, Pré-molares inferiores, Posicionadores radiográficos, Volume reduzido, Odontologia',
        GPTChaves: 'Radiografias intraorais',
        videoName: 'V22'
    },
    {
        id: 23,
        title: 'Posicionador intraoral para realização de radiografias extraorais',
        palavrasChave: 'odontologia, radiografia, posicionador radiográfico, extraoral, adaptativo',
        GPTChaves: '',
        videoName: 'V23'
    },
    {
        id: 24,
        title: 'Detecção automática de dor em equinos por meio de reconhecimento de expressões faciais',
        palavrasChave: ' medicina veterinária, detecção de dor, equinos, cavalos, reconhecimento de expressões faciais, expressões faciais',
        GPTChaves: 'Automação na detecção de dor, Monitoramento contínuo de animais',
        videoName: 'V24'
    },
    {
        id: 25,
        title: 'Nutri persona - Sistema de soluções inteligentes em nutrição',
        palavrasChave: 'nutrição, alimentos, sistema, base de dados, atendimento nutricional, planos alimentares',
        GPTChaves: 'Nutrição personalizada, Tecnologia de informação em nutrição',
        videoName: 'V25'
    },
    {
        id: 26,
        title: 'Enzimas recombinantes para minimização de efeitos do envelhecimento na pele',
        palavrasChave: 'biotecnologia, enzimas, envelhecimento, pele, minimização de efeitos, cosméticos, soluções anti-idade',
        GPTChaves: 'Biotecnologia em cosmetologia, Cuidados com a pele',
        videoName: 'V26'
    },
    {
        id: 27,
        title: 'Composto Benzofuroxano para tratamento de tumores',
        palavrasChave: 'biotecnologia, sistema imunológico, tratamento de tumores, células tumorais, câncer',
        GPTChaves: 'Alvos moleculares, Tratamento direcionado ao câncer',
        videoName: 'V27'
    },
    {
        id: 28,
        title: 'Carreador lipídico para tratamento de leishmaniose por via oral',
        palavrasChave: 'nanotecnologia, tratamento, leishmaniose, via oral, efeitos colaterais, carreador lipídico',
        GPTChaves: 'Nanopartículas',
        videoName: 'V28'
    },
    {
        id: 29,
        title: 'Desassoreador de corpos de água por meio de um sistema eólico-solar',
        palavrasChave: 'engenharia mecânica, energia eólica, energia solar, energia renovável, desassoreamento, painel fotovoltaico, turbina eólica',
        GPTChaves: 'Dragagem, Sedimentos, Sistema híbrido, Bombeamento',
        videoName: 'V29'
    },
    {
        id: 30,
        title: 'Sistema para desenvolvimento de habilidades cognitivas em portadores do transtorno do espectro autistca',
        palavrasChave: 'sistema digital, transtorno do espectro autista, autismo, habilidades cognitivas, ensino por tentativas discretas, gamificação',
        GPTChaves: 'Análise do comportamento aplicada, Feedback',
        videoName: 'V30'
    }

]


const app = express();

let miniSearch = new MiniSearch({
    fields: ['title', 'palavrasChave', 'GPTChaves'],
    storeFields: ['id', 'title', 'videoName'],
    searchOptions: {
        fuzzy: 0.2,
        prefix: true
    }
});

miniSearch.addAll(videos);
app.use(cors());

app.get("/search", (req, res) => {
    const searchQuery = req.query.query;

    const searchResults = miniSearch.search(searchQuery);

    const filteredResults = searchResults.map(result => {
        return {
            id: result.id,
            title: result.title,
            videoName: result.videoName
        }
    });

    res.json(filteredResults);
});

app.get('/videos', (req, res) => res.json(videos));

app.get('/video/:id/data', (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.json(videos[id-1]);
});

app.get('/videos/:id', (req, res) => {
    let path = ``;
    if(req.params.id < 10){
        path = `assets/V0${req.params.id}.mp4`;
    } else {
        path = `assets/V${req.params.id}.mp4`;
    }

    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

app.listen(4000, () => {
    console.log("Listening on port 4000!");
});