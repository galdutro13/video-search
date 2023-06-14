const documentos = [
    {
        id: 1,
        title: 'Biossensor para detecção de anticorpos da COVID-19',
        palavrasChave: 'Biotecnologia, Bioquímica, Análise Clínica, Anticorpos, COVID-19',
        videoName: 'V01'
    },
    {
        id: 2,
        title: 'Micropad à base de papel que permite a detecção de melatonina em comprimidos',
        palavrasChave: 'Bioquímica, Farmacologia, Biossensor, Hormônios, Melatonina',
        videoName: 'V02'
    },
    {
        id: 3,
        title: 'Dispositivo de papel para teste do pezinho',
        palavrasChave: 'Biotecnologia; bioquímica; análise sanguínea; teste do pezinho',
        videoName: 'V03'
    },
    {
        id: 4,
        title: 'Microchip para mimetizar a corrente sanguínea e fazer testes de citotoxicidade',
        palavrasChave: 'Bioquímica; Farmacologia; Citotoxicidade; Células',
        videoName: 'V04'
    },
    {
        id: 5,
        title: 'Método de preparação de quitosanas modificadas como veículos para transporte de metais bioativos',
        palavrasChave: 'Química; Bioquímica; Quitosanas; Bactericidas; Fungicidas',
        videoName: 'V05'
    },
    {
        id: 6,
        title: 'Nova técnica de preparação da N-N’-DICICLOHEXILSULFAMIDA que possui propriedades ansiolíticas e anticonvulsivantes',
        palavrasChave: 'Bioquímica; Farmacologia; Química Verde; Análise Térmica; Ansiolíticos; Anticonvulsivantes',
        videoName: 'V06'
    },
    {
        id: 7,
        title: 'Baterias de sódio como alternativas para baterias em dispositivos',
        palavrasChave: 'Física; Química de materiais; energia verde; baterias; eletrólitos',
        videoName: 'V07'
    },
    {
        id: 8,
        title: 'CEINFAR - Centro de Inovação em Fármacos para trabalho em processos iniciais de descoberta e desenvolvimento de fármacos e biofármacos',
        palavrasChave: 'Ciências Biomédicas; Farmacologia; Biofármacos; Triagem fenotípica; centro de inovação',
        videoName: 'V08'
    },
    {
        id: 9,
        title: 'Novo catalisador para produção de metanol e conversão de CO2',
        palavrasChave: 'Etanol, CO2, ciclo de carbono, metanol, bioetanol',
        videoName: 'V09'
    },
    {
        id: 10,
        title: 'Resinas com potencial antimicrobiano para aumentar a durabilidade de restaurações dentárias',
        palavrasChave: 'resina estética, cárie, antimicrobiano, resinas dentárias, quitosana',
        videoName: 'V10'
    },
    {
        id: 11,
        title: 'Nanocompósitos magneto-luminescentes para produção de óxido de ferro nanoestruturado',
        palavrasChave: 'ensaios não destrutivos, nanopartículas, óxido de ferro, magneto-luorescentes, metal chek',
        videoName: 'V11'
    },
    {
        id: 12,
        title: 'Spiron - Nanopartícula para uso em agente de contraste de ressonâncias magnéticas',
        palavrasChave: 'nanopartícula, ressonância magnética, agente de contraste, gadolínio, diagnóstico de tumor, agente de contraste teranóstico',
        videoName: 'V12'
    },
    {
        id: 13,
        title: 'Aplicativo de realidade aumentada para ensino e aprendizagem de geometria molecular',
        palavrasChave: 'realidade aumentada, educação, modelos tridimensionais, geometria molecular',
        videoName: 'V13'
    },
    {
        id: 14,
        title: 'RGCILex - Plataforma unificada que compila a legislação de petróleo e gás natural no Brasil',
        palavrasChave: 'petróleo, gás, energia limpa, legislação, mudança climática',
        videoName: 'V14'
    },
    {
        id: 15,
        title: 'SOPED - Sistema de orientação ao pé diabético',
        palavrasChave: 'Neuropatia diabética, Autoavaliação, Gamificação, Exercício para os pés, Software educativo, Perdas sensoriais',
        videoName: 'V15'
    },
    {
        id: 16,
        title: 'Sistema de expressão para redução no tempo de identificação na etapa pré-clínica para identificação de novos antibióticos para o combate a resistência bacteriana',
        palavrasChave: 'Ação inibitória, Alvo molecular, Antibióticos, Atividade antimicrobiana, Biossensores',
        videoName: 'V16'
    },
    {
        id: 17,
        title: 'Processo de concentração de efluentes agroindustriais pela redução do teor de água e usos para esse concentrado e seus subprodutos',
        palavrasChave: 'Sucroalcooleiro, Efluentes, Agroindustriais, Vinhaça, Excedente',
        videoName: 'V17'
    }, 
    {
        id: 18,
        title: 'Método para encapsular nanopartículas com antocianinas para indústrias de alimentos e farmacêuticos para coloração e uso como antioxidantes',
        palavrasChave: ' Antocianinas, Coloração, Pigmentos funcionais, Antioxidante',
        videoName: 'V18'
    },
    {
        id: 19,
        title: 'Máscara facial oronasal para resolver a apneia',
        palavrasChave: 'Apneia, Diodos fluídicos, Máscara facial, Impressão 3D',
        videoName: 'V19'
    },
    {
        id: 20,
        title: 'Composição alimentícia contendo Mel de cacau para substituição total ou parcial da sacarose em chocolates e gelados comestíveis',
        palavrasChave: 'Composição alimentícia, Substituição, Chocolate',
        videoName: 'V20'
    },
    {
        id: 21,
        title: 'Sistema de gerenciamento de redes elétricas multi fontes',
        palavrasChave: 'Gerenciamento, Otimização, Redes elétricas, Gerador Híbrido, Algoritmo',
        videoName: 'V21'
    },
    {
        id: 22,
        title: 'Posicionadores de volume reduzido para radiografias de dentes posteriores',
        palavrasChave: 'Molares, Pré-molares inferiores, Posicionadores radiográficos, Volume reduzido, Odontologia',
        videoName: 'V22'
    },
    {
        id: 23,
        title: 'Posicionador intraoral para realização de radiografias extraorais',
        palavrasChave: 'odontologia, radiografia, posicionador radiográfico, extraoral, adaptativo',
        videoName: 'V23'
    },
    {
        id: 24,
        title: 'Detecção automática de dor em equinos por meio de reconhecimento de expressões faciais',
        palavrasChave: ' medicina veterinária, detecção de dor, equinos, cavalos, reconhecimento de expressões faciais, expressões faciais',
        videoName: 'V24'
    },
    {
        id: 25,
        title: 'Nutri persona - Sistema de soluções inteligentes em nutrição',
        palavrasChave: 'nutrição, alimentos, sistema, base de dados, atendimento nutricional, planos alimentares',
        videoName: 'V25'
    },
    {
        id: 26,
        title: 'Enzimas recombinantes para minimização de efeitos do envelhecimento na pele',
        palavrasChave: 'biotecnologia, enzimas, envelhecimento, pele, minimização de efeitos, cosméticos, soluções anti-idade',
        videoName: 'V26'
    },
    {
        id: 27,
        title: 'Composto Benzofuroxano para tratamento de tumores',
        palavrasChave: 'biotecnologia, sistema imunológico, tratamento de tumores, células tumorais, câncer',
        videoName: 'V27'
    },
    {
        id: 28,
        title: 'Carreador lipídico para tratamento de leishmaniose por via oral',
        palavrasChave: 'nanotecnologia, tratamento, leishmaniose, via oral, efeitos colaterais, carreador lipídico',
        videoName: 'V28'
    },
    {
        id: 29,
        title: 'Desassoreador de corpos de água por meio de um sistema eólico-solar',
        palavrasChave: 'engenharia mecânica, energia eólica, energia solar, energia renovável, desassoreamento, painel fotovoltaico, turbina eólica',
        videoName: 'V29'
    },
    {
        id: 30,
        title: 'Sistema para desenvolvimento de habilidades cognitivas em portadores do transtorno do espectro autistca',
        palavrasChave: 'sistema digital, transtorno do espectro autista, autismo, habilidades cognitivas, ensino por tentativas discretas, gamificação',
        videoName: 'V30'
    }

]
