/**
 * antibiotics.js — dados do módulo Antibióticos
 *
 * Segue o mesmo padrão de arquivo único por módulo usado em drugs.js
 * (identidade + posologia juntas, um objeto por droga) — diferente da
 * primeira tentativa desta base de dados, que estava dividida em
 * medications.js + drugsByClass.js. Unificado aqui pra manter
 * consistência com a convenção já usada no projeto real.
 *
 * DIFERENÇA ESTRUTURAL EM RELAÇÃO A drugs.js (Infusão Contínua):
 * cada droga tem um array `indications` (sempre pelo menos 1 item),
 * em vez de doseMin/doseMax/doseUnit direto no objeto da droga. Isso é
 * necessário porque a mesma droga frequentemente tem posologias
 * diferentes por indicação clínica (ex.: cefuroxima tem 3: geral,
 * dose elevada pra otite/pneumonia/pele, e via parenteral) — o shape
 * flat de drugs.js não comporta isso. Ver decisão registrada na
 * conversa que gerou este arquivo.
 *
 * Fontes: bulas profissionais nacionais (Anvisa) e/ou FDA quando a
 * nacional não estava disponível, cruzadas com o Guia Farmacêutico do
 * Hospital Sírio-Libanês (HSL). Cada indicação individual documenta
 * sua(s) fonte(s) no campo `source`. Discrepâncias entre fontes que
 * não foram resolvidas ficam registradas no campo `alerts` de cada
 * indicação — não foram escondidas nem resolvidas arbitrariamente.
 */

export const ANTIBIOTIC_CATEGORIES = {
  PENICILINAS: 'penicilinas',
  CEFALOSPORINAS: 'cefalosporinas',
  MACROLIDEOS: 'macrolideos',
  SULFONAMIDAS: 'sulfonamidas',
  AMINOGLICOSIDEOS: 'aminoglicosideos',
};

export function getAntibioticCategoryLabel(id) {
  const labels = {
    [ANTIBIOTIC_CATEGORIES.PENICILINAS]: 'Penicilinas',
    [ANTIBIOTIC_CATEGORIES.CEFALOSPORINAS]: 'Cefalosporinas',
    [ANTIBIOTIC_CATEGORIES.MACROLIDEOS]: 'Macrolídeos',
    [ANTIBIOTIC_CATEGORIES.SULFONAMIDAS]: 'Sulfonamidas',
    [ANTIBIOTIC_CATEGORIES.AMINOGLICOSIDEOS]: 'Aminoglicosídeos',
  };
  return labels[id] ?? id;
}

export const antibiotics =
[
  {
    "id": "amoxicilina",
    "name": "Amoxicilina",
    "category": "penicilinas",
    "presentation": [
      "Amoxil 500mg/cápsula (GSK)",
      "Amoxil pó para suspensão oral (GSK)"
    ],
    "therapeuticClass": "Antimicrobiano, Penicilina",
    "mechanism": "Inibidor da síntese da parede celular bacteriana (beta-lactâmico).",
    "routeOfAdministration": "",
    "indications": [
      {
        "name": "Posologia geral",
        "doseUnit": "mg/kg/dia",
        "doseMin": 20,
        "doseMax": 100,
        "dosesPerDay": 3,
        "doseDefault": 50,
        "ageWarning": "Neonatos e lactentes ≤ 3 meses: função renal ainda incompleta — não ultrapassar 30mg/kg/dia, dividida em 12/12h.",
        "specialConsiderations": [
          "Fracionamento alternativo: 12/12h (2x/dia), mantendo a mesma dose diária total.",
          "Dose máxima pediátrica: 500mg/dose, independente do cálculo por peso.",
          "Crianças < 10 anos: alternativa de dose fixa por idade (não por peso) — 125-250mg a cada 8 horas (fonte: HSL).",
          "≥ 40kg: usar dose de adulto (250-500mg a cada 8h, ou 500-875mg a cada 12h).",
          "Ajuste renal em crianças < 40kg (fonte: GSK): insuficiência leve (Clcr > 30mL/min) — sem alteração; moderada (Clcr 10-30mL/min) — 15mg/kg 2x/dia (máx. 500mg 2x/dia); grave (Clcr < 10mL/min) — 15mg/kg 1x/dia (máx. 500mg). Diálise peritoneal segue a posologia da insuficiência grave. Hemodiálise segue a posologia da insuficiência grave, com dose adicional de 15mg/kg (crianças < 40kg) administrada durante e ao final de cada sessão."
        ],
        "alerts": [
          "DIVERGÊNCIA DE DOSE MÁXIMA entre fontes: FDA/HSL não citam teto acima de 100mg/kg/dia; a bula nacional (GSK/Amoxil) permite até 150mg/kg/dia em doses divididas para crianças < 40kg. Usar 100mg/kg/dia como teto de referência desta entrada até confirmar em qual cenário clínico o teto de 150mg/kg/dia se aplicaria."
        ],
        "calcNote": "Dose × Peso ÷ nº de tomadas = dose por tomada — limitar a 500mg/dose",
        "source": "Bula profissional (FDA + GSK/Amoxil, Anvisa) + Guia Farmacêutico HSL"
      }
    ]
  },
  {
    "id": "amoxicilina-clavulanato",
    "name": "Amoxicilina + Clavulanato de Potássio",
    "category": "penicilinas",
    "presentation": [
      "Clavulin® 250mg+62,5mg/5mL pó para suspensão oral (GSK)",
      "Novamox® 400mg+57mg/5mL suspensão oral"
    ],
    "therapeuticClass": "Antimicrobiano, Penicilina + Inibidor de Beta-Lactamase",
    "mechanism": "Amoxicilina inibe a síntese da parede celular; clavulanato inibe beta-lactamases bacterianas, restaurando a atividade da amoxicilina contra cepas produtoras dessa enzima.",
    "routeOfAdministration": "",
    "indications": [
      {
        "name": "Posologia geral (suspensão oral)",
        "doseUnit": "mg/kg/dia",
        "doseMin": 20,
        "doseMax": 60,
        "dosesPerDay": 3,
        "doseDefault": 50,
        "ageWarning": "Sem dados clínicos disponíveis para doses acima de 40/10mg/kg/dia em crianças menores de 2 anos (fonte: GSK/Clavulin). Neonatos e lactentes < 12 semanas (3 meses): função renal ainda incompleta — dose de 30mg/kg/dia (componente amoxicilina), dividida em 12/12h (fonte: FDA). Eliminação do clavulanato não é alterada nessa faixa etária.",
        "specialConsiderations": [
          "Dose sempre calculada pelo componente amoxicilina — o clavulanato acompanha proporcionalmente conforme a concentração da suspensão.",
          "Dose baixa (20-40mg/kg/dia): infecções leves/moderadas — trato respiratório superior (ex. amigdalite recorrente), trato respiratório inferior, pele e tecidos moles.",
          "Dose alta (40-60mg/kg/dia): infecções mais grave — trato respiratório superior (otite média, sinusite), trato respiratório inferior (broncopneumonia), trato urinário.",
          "A suspensão 250mg/5mL usa fracionamento 8/8h (3x/dia) — regime desta entrada, e o adotado como padrão. A suspensão 400mg/5mL (Novamox) usa fracionamento 12/12h (2x/dia) — cada concentração tem seu próprio esquema, não é uma divergência entre as fontes.",
          "Duração recomendada para otite média aguda: 10 dias (fonte: FDA).",
          "Dose máxima: < 40kg → seguir faixa alta (até 60mg/kg/dia); ≥ 40kg → dose de adulto."
        ],
        "alerts": [
          "O fracionamento (3x/dia ou 2x/dia) depende da CONCENTRAÇÃO DA SUSPENSÃO usada, não é uma escolha livre: 250mg/5mL → 8/8h; 400mg/5mL (Novamox) → 12/12h. Confirmar qual concentração está disponível antes de prescrever o fracionamento — usar 400mg/5mL com fracionamento 8/8h (ou vice-versa) resulta em dose incorreta."
        ],
        "calcNote": "Dose (componente amoxicilina) × Peso ÷ nº de tomadas = dose por tomada",
        "source": "Bula profissional (GSK/Clavulin, Anvisa + FDA) + Guia Farmacêutico HSL"
      },
      {
        "name": "Ajuste renal pediátrico (< 40kg)",
        "doseUnit": "mg/kg/dose",
        "doseMin": 18.75,
        "doseMax": 18.75,
        "dosesPerDay": 2,
        "doseDefault": 18.75,
        "ageWarning": null,
        "specialConsiderations": [
          "Insuficiência renal leve (Clcr > 30mL/min): sem alteração de dose — usar a posologia geral.",
          "Insuficiência renal moderada (Clcr 10-30mL/min): 18,75mg/kg 2x/dia (máximo de 2 doses de 625mg/dia).",
          "Insuficiência renal grave (Clcr < 10mL/min): 18,75mg/kg em dose única diária (máximo de 625mg/dia) — usar dosesPerDay=1 nesse caso, não 2.",
          "Cada dose de 18,75mg de Clavulin fornece 15mg de amoxicilina + 3,75mg de ácido clavulânico.",
          "A suspensão 250mg+62,5mg/5mL fornece 18,75mg de Clavulin a cada 0,3mL.",
          "Insuficiência hepática: tratamento cauteloso, monitorar função hepática em intervalos regulares."
        ],
        "alerts": [],
        "calcNote": "18,75mg × Peso = dose por tomada (moderada: 2x/dia; grave: 1x/dia — ver considerações)",
        "source": "Bula profissional (GSK/Clavulin, Anvisa)"
      }
    ]
  },
  {
    "id": "azitromicina",
    "name": "Azitromicina",
    "category": "macrolideos",
    "presentation": [
      "Azitromicina di-hidratada suspensão oral (Eurofarma)",
      "Zitromax® pó para suspensão oral 600mg/frasco (HSL)"
    ],
    "therapeuticClass": "Antimicrobiano, Macrolídeo (azalídeo)",
    "mechanism": "Inibe a síntese proteica bacteriana ao se ligar à subunidade 50S do ribossomo.",
    "routeOfAdministration": "",
    "indications": [
      {
        "name": "Posologia geral (suspensão oral)",
        "doseUnit": "mg/kg/dia",
        "doseMin": 10,
        "doseMax": 10,
        "dosesPerDay": 1,
        "doseDefault": 10,
        "ageWarning": null,
        "specialConsiderations": [
          "Dose única diária — administrar 1x/dia, sem fracionar.",
          "Regime padrão: 10mg/kg/dia por 3 dias (dose total do tratamento = 30mg/kg).",
          "Regime alternativo de 5 dias, mesma dose total: 10mg/kg no 1º dia, seguido de 5mg/kg 1x/dia do 2º ao 5º dia.",
          "Faringite estreptocócica: eficácia também demonstrada com 20mg/kg/dia por 3 dias — não exceder 500mg/dia neste esquema específico.",
          "Administrar 1h antes ou 2h após as refeições.",
          "Suspensão contém açúcar."
        ],
        "alerts": [
          "DISCREPÂNCIA ENTRE AS FONTES na dose máxima total do tratamento: bula Eurofarma cita 1500mg como teto para qualquer tratamento em crianças; HSL cita 2g (2000mg) para VO, sem diferenciar adulto de pediatria. Até confirmar qual se aplica, considerar o mais conservador (1500mg) como teto pediátrico.",
          "Peso acima de 45 kg: usar posologia de ADULTO, não o cálculo por mg/kg — 500mg/dia por 3 dias, ou 500mg no 1º dia seguido de 250mg/dia do 2º ao 5º dia (regime de 5 dias)."
        ],
        "calcNote": "Dose × Peso = dose diária única — repetir 1x/dia por 3 dias (ou regime de 5 dias, ver considerações)",
        "source": "Bula profissional (Eurofarma) + Guia Farmacêutico HSL"
      },
      {
        "name": "Otite média aguda — dose única (alternativa)",
        "doseUnit": "mg/kg",
        "doseMin": 30,
        "doseMax": 30,
        "dosesPerDay": 1,
        "doseDefault": 30,
        "ageWarning": null,
        "specialConsiderations": [
          "DOSE ÚNICA PARA TODO O TRATAMENTO — administrar uma vez e não repetir. Diferente da posologia geral desta droga (que é diária, repetida por 3 ou 5 dias).",
          "Alternativa citada na bula nacional (Eurofarma) especificamente para otite média aguda."
        ],
        "alerts": [
          "NÃO CONFUNDIR com a posologia geral (10mg/kg/dia repetida por 3 dias) — são esquemas diferentes para a mesma droga. Confirmar com o prescritor qual regime está sendo seguido antes de repetir a dose em dias subsequentes."
        ],
        "calcNote": "Dose × Peso = dose única — NÃO repetir em dias seguintes",
        "source": "Bula profissional (Eurofarma)"
      }
    ]
  },
  {
    "id": "cefalexina",
    "name": "Cefalexina",
    "category": "cefalosporinas",
    "presentation": [
      "Cefalexina monoidratada suspensão oral 250mg/5mL (Antibióticos do Brasil)",
      "Keflex® suspensão 50mg/mL (HSL)"
    ],
    "therapeuticClass": "Antimicrobiano, Cefalosporina de 1ª geração",
    "mechanism": "Inibidor da síntese da parede celular bacteriana (beta-lactâmico).",
    "routeOfAdministration": "",
    "indications": [
      {
        "name": "Posologia geral (suspensão oral)",
        "doseUnit": "mg/kg/dia",
        "doseMin": 50,
        "doseMax": 50,
        "dosesPerDay": 4,
        "doseDefault": 50,
        "ageWarning": "HSL restringe a > 1 ano de idade; a bula nacional não define idade mínima explicitamente.",
        "specialConsiderations": [
          "Padrão adotado: 50mg/kg/dia, fracionada em 4x/dia (6/6h) — segue a recomendação do HSL para a faixa geral.",
          "Bula nacional também aceita fracionamento em 2x/dia (12/12h) para casos leves/não complicados — faringite estreptocócica (> 1 ano), ITU não complicada, infecções de pele e estrutura da pele — usando a faixa 25-50mg/kg/dia.",
          "Infecções graves: a dose pode ser dobrada (até 100mg/kg/dia).",
          "Faringite por estreptococos beta-hemolíticos: tratamento mínimo de 10 dias.",
          "Dose máxima diária de referência: 4g/dia — acima disso, considerar cefalosporina injetável."
        ],
        "alerts": [],
        "calcNote": "Dose × Peso ÷ nº de tomadas = dose por tomada",
        "source": "Bula profissional nacional (Antibióticos do Brasil, aprovada Anvisa) + Guia Farmacêutico HSL"
      },
      {
        "name": "Otite média (dose elevada)",
        "doseUnit": "mg/kg/dia",
        "doseMin": 75,
        "doseMax": 100,
        "dosesPerDay": 4,
        "doseDefault": 100,
        "ageWarning": "HSL restringe a > 1 ano de idade; a bula nacional não define idade mínima explicitamente.",
        "specialConsiderations": [
          "Estudos clínicos demonstraram necessidade de 75-100mg/kg/dia, fracionada em 4x/dia (6/6h), para tratamento de otite média — dose superior à posologia geral desta droga.",
          "Dose máxima diária de referência: 4g/dia — acima disso, considerar cefalosporina injetável."
        ],
        "alerts": [],
        "calcNote": "Dose × Peso ÷ 4 = dose por tomada (6/6h)",
        "source": "Bula profissional nacional (Antibióticos do Brasil, aprovada Anvisa)"
      }
    ]
  },
  {
    "id": "sulfametoxazol-trimetoprima",
    "name": "Sulfametoxazol + Trimetoprima",
    "category": "sulfonamidas",
    "presentation": [
      "Suspensão oral sulfametoxazol + trimetoprima (referência BulasMed — bula secundária/histórica)",
      "Bactrim®/Infectrin® — nomes comerciais citados no HSL"
    ],
    "therapeuticClass": "Antimicrobiano, Sulfonamida + Inibidor da di-hidrofolato redutase",
    "mechanism": "Bloqueio sequencial de duas etapas da síntese de ácido fólico bacteriano — sulfametoxazol inibe a di-hidropteroato sintase, trimetoprima inibe a di-hidrofolato redutase.",
    "routeOfAdministration": "",
    "indications": [
      {
        "name": "Posologia geral (suspensão oral)",
        "doseUnit": "mg/kg/dia",
        "doseMin": 6,
        "doseMax": 8,
        "dosesPerDay": 2,
        "doseDefault": 8,
        "ageWarning": "Bula nacional não cobre uso abaixo de 6 semanas de vida — faixa etária mais jovem apresentada é \"6 semanas a 5 meses\".",
        "specialConsiderations": [
          "Dose calculada pelo componente trimetoprima — o sulfametoxazol acompanha na proporção 1:5 (ex.: 8mg/kg/dia de trimetoprima ≈ 40mg/kg/dia de sulfametoxazol).",
          "6mg/kg/dia (bula nacional, dose \"usual\" por faixa etária) e 8mg/kg/dia (HSL, infecções moderadas — otite média, shigelose, infecção urinária) — ambas cobrem o mesmo tipo de indicação; 8mg/kg/dia adotado como padrão por vir da fonte mais granular por indicação.",
          "Fracionamento padrão: 12/12h, administrado de preferência após uma refeição.",
          "Duração mínima: 5 dias em infecções agudas, ou até o paciente estar assintomático por pelo menos 2 dias. Reavaliar se não houver melhora clínica após 7 dias.",
          "Ajuste renal: Clcr > 30mL/min — sem ajuste; Clcr 15-30mL/min — 50% da dose; Clcr < 15mL/min — uso não recomendado.",
          "Dose máxima (adulto e pediatria): 20mg/kg/dia de trimetoprima — confirmada por pesquisa (OpenEvidence), consistente com a faixa de infecções graves/pneumocistose do HSL abaixo."
        ],
        "alerts": [
          "INFECÇÕES GRAVES E PNEUMOCISTOSE exigem dose e fracionamento bem diferentes do padrão desta entrada: 15-20mg/kg/dia de trimetoprima, fracionada em 4x/dia (6/6h) — quase o dobro da dose e o dobro do número de tomadas. Confirmado como referência válida (HSL, validado por pesquisa/OpenEvidence) — usar esta faixa para pneumocistose ou infecções graves, não a alternativa mais simples da bula nacional (+50% sobre a dose usual, ≈ 9mg/kg/dia)."
        ],
        "calcNote": "Dose (trimetoprima) × Peso ÷ 2 = dose por tomada (12/12h)",
        "source": "Bula profissional nacional (BulasMed) + Guia Farmacêutico HSL"
      }
    ]
  },
  {
    "id": "penicilina-g-benzatina",
    "name": "Penicilina G Benzatina (Benzilpenicilina)",
    "category": "penicilinas",
    "presentation": [
      "Benzetacil® injetável 1.200.000 UI/4mL (Eurofarma)",
      "Bepeben® injetável 1.200.000 UI/4mL (opção para falta, citado no HSL)"
    ],
    "therapeuticClass": "Antimicrobiano, Penicilina (ação prolongada/depot)",
    "mechanism": "Inibidor da síntese da parede celular bacteriana (beta-lactâmico); formulação de liberação lenta, mantém níveis séricos baixos e prolongados após injeção IM.",
    "routeOfAdministration": "IM",
    "indications": [
      {
        "name": "Infecções estreptocócicas (faringoamigdalite) / profilaxia de febre reumática",
        "doseUnit": "UI",
        "doseMin": 300000,
        "doseMax": 1200000,
        "dosesPerDay": 1,
        "doseDefault": 600000,
        "ageWarning": null,
        "specialConsiderations": [
          "DOSE FIXA POR FAIXA DE PESO (fonte Eurofarma/Benzetacil), não fórmula por kg: crianças até 27kg → 300.000-600.000 UI, dose única; crianças maiores → 900.000 UI, dose única; adultos → 1.200.000 UI, dose única.",
          "Via IM PROFUNDA exclusivamente — não é via oral.",
          "Profilaxia de febre reumática/glomerulonefrite: repetir 1.200.000 UI a cada 4 semanas (uso periódico contínuo, não dose única de tratamento agudo).",
          "Dose máxima de referência (HSL): ≥ 60kg → 2,4 milhões UI; < 60kg → 1,2 milhões UI.",
          "Ajuste renal (HSL): Clcr 10-50mL/min → 75% da dose; Clcr < 10mL/min → 20-50% da dose. Hemodiálise: removida pela diálise — administrar após a sessão."
        ],
        "alerts": [
          "Unidade do HSL esclarecida: \"MUI\" no trecho \"25-50 MUI/kg\" significa MIL UI (25.000-50.000 UI/kg), não milhões — confirmado pelo usuário. Esse valor bate com a dose de sífilis congênita da bula Eurofarma (50.000 UI/kg). Mesmo assim, esta entrada usa a estrutura por FAIXA DE PESO da bula Eurofarma (degraus fixos) como padrão, por decisão do usuário — a referência em UI/kg do HSL não é usada como fórmula de cálculo aqui.",
          "SÍFILIS (todos os estágios) e BOUBA/BEJEL/PINTA usam doses e esquemas totalmente diferentes deste padrão (ex.: sífilis primária/secundária/latente precoce = 2.400.000 UI dose única; sífilis congênita = 50.000 UI/kg). Não incluídas nesta entrada — consultar a bula Eurofarma diretamente para o esquema completo por estágio."
        ],
        "calcNote": "Dose fixa por faixa de peso — NÃO multiplicar por peso como nas outras drogas deste bloco (exceção: sífilis congênita, 50.000 UI/kg, fora do escopo desta entrada).",
        "source": "Bula profissional nacional (Eurofarma/Benzetacil) + Guia Farmacêutico HSL"
      }
    ]
  },
  {
    "id": "claritromicina",
    "name": "Claritromicina",
    "category": "macrolideos",
    "presentation": [
      "Claritromicina suspensão oral (genérico, laboratório Clabat)",
      "Klaricid® suspensão pediátrica 25mg/mL (HSL)"
    ],
    "therapeuticClass": "Antimicrobiano, Macrolídeo",
    "mechanism": "Inibe a síntese proteica bacteriana ao se ligar à subunidade 50S do ribossomo.",
    "routeOfAdministration": "",
    "indications": [
      {
        "name": "Posologia geral (suspensão oral)",
        "doseUnit": "mg/kg/dia",
        "doseMin": 15,
        "doseMax": 15,
        "dosesPerDay": 2,
        "doseDefault": 15,
        "ageWarning": "Divergência de idade mínima entre fontes: bula nacional (Clabat) indica uso a partir de 6 meses; HSL indica a partir de 3 meses. Até esclarecer, considerar 6 meses como referência mais conservadora.",
        "specialConsiderations": [
          "Equivalente a 7,5mg/kg/dose, administrada a cada 12 horas (ambas as fontes concordam neste valor por tomada).",
          "Crianças que pesam menos de 8kg devem seguir a mesma dosagem por kg (7,5mg/kg/dose, 12/12h) — fonte Clabat.",
          "Duração do tratamento: bula nacional recomenda 5-10 dias; HSL permite até 14 dias (tempo máximo de tratamento). Duração real depende da indicação clínica.",
          "Pode ser administrada com ou sem alimentos, inclusive com leite.",
          "Suspensão contém açúcar.",
          "Cautela em pacientes em uso de anticoagulantes — risco aumentado de sangramento.",
          "Ajuste renal: Clcr < 30mL/min — reduzir a dose em 50%. Sem necessidade de ajuste hepático.",
          "Dose máxima: 500mg por tomada (ou seja, 500mg 2x/dia), independente do cálculo por peso."
        ],
        "alerts": [
          "INFECÇÕES POR MICOBACTÉRIAS (ex.: Mycobacterium avium complex) usam faixa de dose mais ampla e potencialmente maior — 7-15mg/kg (fonte Clabat, mesma redação ambígua \"por kg... duas vezes ao dia\" da posologia geral, sem esclarecer se é por dose ou por dia) — não incluída no cálculo padrão desta entrada. Tratamento de duração prolongada, guiado por benefício clínico, tipicamente em contexto de imunocomprometimento — fora do escopo ambulatorial padrão deste bloco."
        ],
        "calcNote": "Dose × Peso ÷ 2 = dose por tomada (12/12h) — equivalente a 7,5mg/kg/dose; limitar a 500mg/tomada",
        "source": "Bula profissional nacional (Clabat) + Guia Farmacêutico HSL"
      }
    ]
  },
  {
    "id": "cefuroxima",
    "name": "Cefuroxima (Axetilcefuroxima)",
    "category": "cefalosporinas",
    "presentation": [
      "Axetilcefuroxima 50mg/mL suspensão oral (Ranbaxy)",
      "Zinnat® 250mg/comprimido e suspensão 250mg/5mL (HSL)",
      "Zinacef® injetável 750mg/frasco (HSL) — via IM/EV"
    ],
    "therapeuticClass": "Antimicrobiano, Cefalosporina de 2ª geração",
    "mechanism": "Inibidor da síntese da parede celular bacteriana (beta-lactâmico). Axetilcefuroxima é o pró-fármaco oral, hidrolisado a cefuroxima ativa após absorção.",
    "routeOfAdministration": "oral e IM/EV",
    "indications": [
      {
        "name": "Posologia geral (via oral)",
        "doseUnit": "mg/kg/dia",
        "doseMin": 20,
        "doseMax": 20,
        "dosesPerDay": 2,
        "doseDefault": 20,
        "ageWarning": "Sem dados clínicos para uso abaixo de 3 meses de idade (ambas as fontes concordam nesse ponto).",
        "specialConsiderations": [
          "20mg/kg/dia (10mg/kg/dose, 12/12h): amigdalite, faringite, sinusite, bronquite — dose padrão adotada nesta entrada.",
          "Duração usual do tratamento: 7 dias (pode variar de 5 a 10 dias).",
          "Comprimidos devem ser ingeridos preferencialmente após as refeições — aumenta a absorção. Se a suspensão for diluída em suco de frutas, usar imediatamente; não usar líquidos quentes no preparo.",
          "Ajuste renal (via oral): Clcr > 30mL/min — sem ajuste; Clcr 10-29mL/min — administrar a cada 24h; Clcr < 10mL/min — administrar a cada 48h."
        ],
        "alerts": [
          "DISCREPÂNCIA DE DOSE MÁXIMA entre fontes para esta mesma faixa (20mg/kg/dia): bula Ranbaxy cita máximo de 500mg/dia; HSL cita máximo de 250mg/dia — metade do valor. Usar o mais conservador (250mg/dia) até esclarecer."
        ],
        "calcNote": "Dose × Peso ÷ 2 = dose por tomada (12/12h) — limitar a 250mg/dia (ver alerta de discrepância)",
        "source": "Bula profissional (Ranbaxy) + Guia Farmacêutico HSL"
      },
      {
        "name": "Otite média, sinusite, pneumonia, ITU e pele (dose elevada)",
        "doseUnit": "mg/kg/dia",
        "doseMin": 30,
        "doseMax": 30,
        "dosesPerDay": 2,
        "doseDefault": 30,
        "ageWarning": "HSL restringe otite média, pneumonia e piodermites especificamente a maiores de 2 anos. Sinusite e ITU não têm essa restrição explícita nas fontes.",
        "specialConsiderations": [
          "30mg/kg/dia (15mg/kg/dose, 12/12h): otite média, sinusite, pneumonia, infecção do trato urinário e infecções de pele.",
          "Duração usual do tratamento: 7 dias (pode variar de 5 a 10 dias).",
          "Mesmas orientações de administração e ajuste renal (via oral) da posologia geral desta droga."
        ],
        "alerts": [
          "DISCREPÂNCIA DE DOSE MÁXIMA entre fontes: bula Ranbaxy cita máximo de 1000mg/dia; HSL cita máximo de 500mg/dia — metade do valor. Usar o mais conservador (500mg/dia) até esclarecer."
        ],
        "calcNote": "Dose × Peso ÷ 2 = dose por tomada (12/12h) — limitar a 500mg/dia (ver alerta de discrepância)",
        "source": "Bula profissional (Ranbaxy) + Guia Farmacêutico HSL"
      },
      {
        "name": "Via parenteral (IM/EV)",
        "doseUnit": "mg/kg/dia",
        "doseMin": 75,
        "doseMax": 240,
        "dosesPerDay": 3,
        "doseDefault": 150,
        "ageWarning": null,
        "specialConsiderations": [
          "Faixa ampla (75-240mg/kg/dia) — dose real depende da gravidade/indicação específica; fonte não detalha por indicação separadamente para a via parenteral.",
          "Reconstituição: EV com 6mL de água destilada; IM com 3mL de água destilada. Diluição em 50-100mL de SF/SG5%/SG10%/RL, concentração máxima 90mg/mL.",
          "Administração EV: injeção direta em 3-5 minutos, ou diluída em 15-30 minutos. IM: aplicar em área de grande massa muscular.",
          "Dose máxima de referência (provavelmente adulto — fonte não especifica): 9g/dia IM ou EV.",
          "Ajuste renal (IM/EV): Clcr > 30mL/min — sem ajuste; Clcr 10-20mL/min — 0,75g a 1,5g a cada 12h (valor fixo citado pra adultos E crianças na fonte — não é claro se essa dose fixa deveria ser ajustada por peso em pediatria; usar com cautela). Hemodiálise: dialisável (25%) — programar administração após a sessão."
        ],
        "alerts": [
          "Dose máxima de 9g/dia não especifica se é referência adulta ou também se aplica à pediatria — confirmar antes de usar como teto em cálculo pediátrico."
        ],
        "calcNote": "Dose × Peso ÷ 3 = dose por tomada (8/8h)",
        "source": "Guia Farmacêutico HSL"
      }
    ]
  },
  {
    "id": "cefaclor",
    "name": "Cefaclor",
    "category": "cefalosporinas",
    "presentation": [
      "Ceclor® 500mg/cápsula e suspensão 250mg/5mL — 50mg/mL (HSL). Concentração usada como referência de cálculo em drugsByClass.js.",
      "Ceclor® BD comprimidos revestidos 500mg e suspensão 375mg/5mL — concentração alternativa, não usada nos cálculos atuais."
    ],
    "therapeuticClass": "Antimicrobiano, Cefalosporina de 2ª geração",
    "mechanism": "Inibidor da síntese da parede celular bacteriana (beta-lactâmico).",
    "routeOfAdministration": "",
    "indications": [
      {
        "name": "Posologia geral (suspensão oral 250mg/5mL)",
        "doseUnit": "mg/kg/dia",
        "doseMin": 20,
        "doseMax": 20,
        "dosesPerDay": 3,
        "doseDefault": 20,
        "ageWarning": "HSL restringe a > 1 mês de idade.",
        "specialConsiderations": [
          "Dose padrão: 20mg/kg/dia, dividida a cada 8 horas (3x/dia) — infecções do trato respiratório inferior (incluindo pneumonia), pele e trato urinário.",
          "Faringite/amigdalite (S. pyogenes): mesma dose (20mg/kg/dia), mas pode ser fracionada em 12/12h em vez de 8/8h.",
          "Infecções estreptocócicas beta-hemolíticas (faringite): tratamento mínimo de 10 dias, mesmo com melhora clínica precoce — reduz risco de febre reumática (dados de eficácia do cefaclor especificamente pra essa prevenção são limitados).",
          "Penicilina continua sendo o fármaco de escolha para faringite estreptocócica — cefaclor é alternativa quando indicado.",
          "Dose máxima pediátrica: 1g/dia, independente do peso corporal.",
          "Cepas de H. influenzae beta-lactamase-negativas resistentes à ampicilina (BLNAR) devem ser consideradas resistentes ao cefaclor, mesmo com aparente suscetibilidade in vitro."
        ],
        "alerts": [
          "DISCREPÂNCIA DE AJUSTE RENAL entre fontes: FDA/DailyMed indica que a dose pediátrica geralmente NÃO precisa de ajuste em insuficiência renal; HSL traz uma tabela de ajuste (Clcr 10-50mL/min → 50-100% da dose; Clcr < 10mL/min → 50% da dose). Não resolvida — usar critério clínico até esclarecer."
        ],
        "calcNote": "Dose × Peso ÷ 3 = dose por tomada (8/8h) — faringite pode usar ÷ 2 (12/12h)",
        "source": "Bula profissional (FDA/DailyMed, via pesquisa OpenEvidence) + Guia Farmacêutico HSL"
      },
      {
        "name": "Dose elevada (otite média / infecções graves)",
        "doseUnit": "mg/kg/dia",
        "doseMin": 40,
        "doseMax": 40,
        "dosesPerDay": 2,
        "doseDefault": 40,
        "ageWarning": "HSL restringe a > 1 mês de idade.",
        "specialConsiderations": [
          "Otite média aguda: dose de 40mg/kg/dia — a dose diária total pode ser administrada a cada 12 horas em vez de a cada 8 horas (fracionamento simplificado, opção específica desta indicação).",
          "Infecções do trato respiratório inferior, pele e trato urinário: mesma dose elevada (40mg/kg/dia) em casos mais graves ou causados por organismos menos suscetíveis — mesmo fracionamento de 8/8h da posologia geral, salvo indicação em contrário.",
          "Dose máxima pediátrica: 1g/dia, independente do peso corporal — mesmo teto da posologia geral."
        ],
        "alerts": [],
        "calcNote": "Dose × Peso ÷ 2 = dose por tomada (12/12h, otite média) — outras indicações graves podem manter ÷ 3 (8/8h)",
        "source": "Bula profissional (FDA/DailyMed, via pesquisa OpenEvidence)"
      }
    ]
  },
  {
    "id": "ceftriaxona",
    "name": "Ceftriaxona",
    "category": "cefalosporinas",
    "presentation": [
      "Rocefin® IM/EV 1g/frasco (HSL)",
      "Keftron® EV e IM 1g/frasco (HSL)",
      "Ceftriaxona sódica pó para solução injetável (Eurofarma)"
    ],
    "therapeuticClass": "Antimicrobiano, Cefalosporina de 3ª geração",
    "mechanism": "Inibidor da síntese da parede celular bacteriana (beta-lactâmico); meia-vida longa permite dose única diária.",
    "routeOfAdministration": "IM e EV",
    "indications": [
      {
        "name": "Posologia geral (lactentes 15 dias a 12 anos, < 50kg)",
        "doseUnit": "mg/kg/dia",
        "doseMin": 20,
        "doseMax": 80,
        "dosesPerDay": 1,
        "doseDefault": 50,
        "ageWarning": "Faixa etária desta entrada: 15 dias a 12 anos. Recém-nascidos < 14 dias têm posologia e contraindicações PRÓPRIAS — ver indicação separada. Crianças ≥ 50kg devem usar a posologia de adulto (1-2g dose única diária; casos graves, até 4g 1x/dia).",
        "specialConsiderations": [
          "Dose única diária (a cada 24h) — bula nacional recomenda administração 1x/dia para toda a faixa pediátrica de 15 dias a 12 anos.",
          "Doses intravenosas ≥ 50mg/kg de peso corpóreo devem ser infundidas em período ≥ 30 minutos.",
          "Duração do tratamento: manter por, no mínimo, 48-72h após desaparecimento da febre ou evidência de erradicação bacteriana — duração total varia conforme evolução clínica.",
          "Sinergismo com aminoglicosídeos documentado experimentalmente para bacilos Gram-negativos (considerar em infecções graves com risco de morte, ex.: Pseudomonas aeruginosa) — MAS deve ser administrado em separado (ver alerta de incompatibilidade química).",
          "IM: dissolver 500mg em 2mL ou 1g em 3,5mL de lidocaína 1%; não injetar mais de 1g por sítio de aplicação, em região glútea ou outro músculo grande.",
          "EV direta: 3-5 minutos. EV diluído: acima de 30 minutos (pode ser feito em infusão prolongada de até 3h em pacientes críticos, considerando perfil farmacocinético tempo-dependente). Padrão HSL institucional: 60 minutos.",
          "Dose máxima: 4g/dia.",
          "Ajuste renal: nenhum ajuste necessário, exceto se associado a disfunção hepática — nesse caso, dose máxima ≤ 2g/dia. Ajuste hepático: nenhum, exceto se associado a disfunção renal."
        ],
        "alerts": [
          "DISCREPÂNCIA ENTRE FONTES na faixa de dose e frequência: HSL cita 50-75mg/kg/dia em 1-2 doses divididas a cada 12-24h; bula nacional (Eurofarma) cita faixa mais ampla, 20-80mg/kg/dia, em dose ÚNICA diária (24h), sem opção de fracionar em 2 doses. Esta entrada segue a bula nacional (dose única) como padrão — se estiver fracionando em 12/12h conforme HSL, confirmar se a indicação clínica realmente pede esse esquema.",
          "INCOMPATIBILIDADE QUÍMICA com aminoglicosídeos, anfotericina B (ansacrina, conforme fonte), vancomicina e fluconazol — NUNCA administrar na mesma via/linha; administrar em horários/acessos separados.",
          "NÃO reconstituir nem coadministrar com soluções contendo cálcio (mesma restrição que se aplica de forma crítica aos neonatos — ver indicação separada) — vale para todas as idades, mas o risco é mais grave em recém-nascidos.",
          "O diluente de ceftriaxona IM (contém lidocaína) NUNCA deve ser administrado por via EV — uso exclusivamente IM."
        ],
        "calcNote": "Dose × Peso = dose única diária — limitar a 4g/dia",
        "source": "Bula profissional (Eurofarma) + Guia Farmacêutico HSL"
      },
      {
        "name": "Recém-nascidos < 14 dias (CRÍTICO — ver contraindicações)",
        "doseUnit": "mg/kg/dia",
        "doseMin": 20,
        "doseMax": 50,
        "dosesPerDay": 1,
        "doseDefault": 50,
        "ageWarning": "Restrito a recém-nascidos com menos de 14 dias de vida. NÃO ultrapassar 50mg/kg — este é o teto absoluto desta faixa, não um \"default\" ajustável livremente.",
        "specialConsiderations": [
          "Dose única diária (24h).",
          "Em neonatos, doses intravenosas devem ser administradas durante 60 minutos (não 30, como no restante da faixa pediátrica) para reduzir o risco de encefalopatia bilirrubínica."
        ],
        "alerts": [
          "CONTRAINDICAÇÃO ABSOLUTA #1: ceftriaxona sódica é CONTRAINDICADA em neonatos PREMATUROS com idade pós-menstrual (idade gestacional + idade cronológica) de até 41 semanas.",
          "CONTRAINDICAÇÃO ABSOLUTA #2: ceftriaxona sódica é CONTRAINDICADA em recém-nascidos ≤ 28 dias que requeiram (ou possam vir a requerer) tratamento com soluções EV contendo cálcio — incluindo infusão contínua de cálcio, como nutrição parenteral. Risco de precipitação de ceftriaxona-cálcio, que pode ser fatal. Esta não é uma precaução relativa — é contraindicação absoluta nesse cenário.",
          "Antes de prescrever para qualquer neonato, confirmar: (1) idade pós-menstrual > 41 semanas, e (2) ausência de necessidade atual ou prevista de solução EV com cálcio (incluindo nutrição parenteral). Se qualquer uma dessas condições não puder ser confirmada, NÃO usar ceftriaxona — considerar alternativa."
        ],
        "calcNote": "Dose × Peso = dose única diária — NÃO ultrapassar 50mg/kg. Verificar contraindicações antes de calcular.",
        "source": "Bula profissional (Eurofarma)"
      }
    ]
  },
  {
    "id": "ampicilina",
    "name": "Ampicilina",
    "category": "penicilinas",
    "presentation": [
      "Ampicilina 500mg/comprimido e suspensão 50mg/mL (HSL) — não usadas nos cálculos atuais (escopo restrito a EV/IM).",
      "Amplacilina® injetável 1g/frasco (HSL)"
    ],
    "therapeuticClass": "Antimicrobiano, Penicilina",
    "mechanism": "Inibidor da síntese da parede celular bacteriana (beta-lactâmico); espectro estendido em relação à penicilina, cobrindo alguns gram-negativos.",
    "routeOfAdministration": "IM e EV (via oral existe comercialmente, fora do escopo de cálculo)",
    "indications": [
      {
        "name": "Via EV/IM — crianças (> 1 mês)",
        "doseUnit": "mg/kg/dia",
        "doseMin": 100,
        "doseMax": 400,
        "dosesPerDay": 4,
        "doseDefault": 200,
        "ageWarning": "Faixa etária desta entrada: acima de 1 mês. Recém-nascidos (≤ 2kg ou faixa neonatal) têm estrutura de dose PRÓPRIA — ver indicação separada.",
        "specialConsiderations": [
          "Faixa ampla (100-400mg/kg/dia) — dose real depende da gravidade/indicação; fonte HSL não detalha por indicação separadamente pra via EV/IM em crianças (diferente da bula nacional, que é organizada por indicação mas cobre principalmente a via oral).",
          "Meningite bacteriana (bula nacional, referência de adulto/geral): 100-200mg/kg/dia — dentro da faixa desta entrada.",
          "Reconstituição: 500mg em 2mL de água destilada; 1g em 3mL. Diluição em 50-100mL de SF/SG5%/Ringer-Lactato. Concentração máxima EV: 30mg/mL.",
          "Administração EV direta: 125-500mg em 3-5min; 1-2g em 10-15min. Administrações mais rápidas podem causar convulsões. EV intermitente: 30 minutos.",
          "Dose máxima: < 20kg — 300mg/kg/dia; ≥ 20kg — 12g/dia.",
          "Ajuste renal (EV/IM pediátrico): Clcr 30-50mL/min — 35-50mg/kg/dose a cada 6h; Clcr 10-29mL/min — 35-50mg/kg/dose a cada 8-12h; Clcr < 10mL/min — 35-50mg/kg/dose a cada 12h. Hemodiálise: dialisável (20-50%), administrar após a sessão."
        ],
        "alerts": [
          "INCOMPATIBILIDADE FÍSICA COM AMINOGLICOSÍDEOS (ex.: gentamicina): as penicilinas, incluindo ampicilina sódica, NÃO devem ser misturadas com aminoglicosídeos na mesma seringa — pode ocorrer inativação física do fármaco. Combinação terapêutica é comum (ex.: sepse neonatal), mas a administração deve ser sempre em seringas/vias separadas."
        ],
        "calcNote": "Dose × Peso ÷ 4 = dose por tomada (6/6h) — ajustar conforme gravidade dentro da faixa",
        "source": "Guia Farmacêutico HSL + bula profissional nacional (referência de meningite)"
      },
      {
        "name": "Via EV/IM — recém-nascidos (> 2kg)",
        "doseUnit": "mg/kg/dose",
        "doseMin": 50,
        "doseMax": 100,
        "dosesPerDay": 4,
        "doseDefault": 50,
        "ageWarning": "Restrito a recém-nascidos com peso > 2kg. A fonte não especifica conduta para neonatos abaixo desse peso.",
        "specialConsiderations": [
          "QUATRO COMBINAÇÕES POSSÍVEIS, conforme idade e gravidade (fonte HSL):",
          "  • > 7 dias, uso geral: 50mg/kg/dose a cada 6h (4x/dia) — valor padrão adotado nesta entrada.",
          "  • > 7 dias, sepse/meningite: 50-75mg/kg/dose em 4 doses (6/6h) — dose mais alta, mesmo fracionamento.",
          "  • < 7 dias, uso geral: 50mg/kg/dose a cada 8h (3x/dia) — mesma dose por tomada, fracionamento mais espaçado (rim neonatal mais imaturo).",
          "  • < 7 dias, sepse/meningite: 50-100mg/kg/dose a cada 12h (2x/dia) — dose mais alta, fracionamento mais espaçado ainda.",
          "Selecionar a combinação correta ANTES de calcular — idade em dias E gravidade do quadro mudam tanto a dose quanto o fracionamento, não é só uma questão de intensidade."
        ],
        "alerts": [
          "INCOMPATIBILIDADE FÍSICA COM AMINOGLICOSÍDEOS (ex.: gentamicina): mesma observação da indicação EV/IM para crianças maiores — não misturar na mesma seringa, mesmo sendo combinação terapêutica padrão em sepse neonatal."
        ],
        "calcNote": "Dose × Peso = dose por tomada — fracionamento (6h/8h/12h) depende da combinação idade × gravidade, ver considerações",
        "source": "Guia Farmacêutico HSL"
      }
    ]
  },
  {
    "id": "gentamicina",
    "name": "Gentamicina",
    "category": "aminoglicosideos",
    "presentation": [
      "Garamicina® 60mg e 80mg injetável, 40mg/mL (HSL)",
      "Hytamicina® injetável (bula nacional)"
    ],
    "therapeuticClass": "Antimicrobiano, Aminoglicosídeo",
    "mechanism": "Inibe a síntese proteica bacteriana ao se ligar irreversivelmente à subunidade 30S do ribossomo — bactericida, ao contrário da maioria dos inibidores da síntese proteica.",
    "routeOfAdministration": "IM e EV",
    "indications": [
      {
        "name": "Via IM/EV — pediatria (função renal normal)",
        "doseUnit": "mg/kg/dia",
        "doseMin": 6,
        "doseMax": 7.5,
        "dosesPerDay": 3,
        "doseDefault": 7.5,
        "ageWarning": "Válida para crianças, lactentes e neonatos com mais de 1 semana de vida. Neonatos ≤ 1 semana (pré-termo ou a termo) têm dose e fracionamento PRÓPRIOS, menores — ver indicação separada.",
        "specialConsiderations": [
          "Dose máxima confirmada (FDA, via OpenEvidence): até 7,5mg/kg/dia (2,5mg/kg a cada 8h) — teto de referência com função renal normal, tanto pra crianças quanto pra lactentes/neonatos > 1 semana.",
          "HSL diferencia por idade: < 5 anos — 5mg/kg/dia; ≥ 5 anos — 7,5mg/kg/dia. Bula nacional (Hytamicina) não diferencia por idade dentro da pediatria — dá uma faixa única de 6-7,5mg/kg/dia (2,0-2,5mg/kg a cada 8h), consistente com o teto confirmado pela FDA.",
          "Alvos de concentração sérica (FDA): pico ≤ 12mcg/mL; vale ≤ 2mcg/mL. Níveis sustentados acima desses valores aumentam o risco de toxicidade renal e do 8º nervo craniano (ototoxicidade/vestibular).",
          "Duração usual do tratamento: 7-10 dias. Cursos além de 10 dias exigem monitoramento de função renal, auditiva e vestibular — risco de toxicidade aumenta com exposição mais prolongada ou dose cumulativa mais alta.",
          "CALCULAR A DOSE SOBRE O PESO IDEAL, não o peso real — orientação explícita do HSL, especialmente relevante em pacientes com sobrepeso/obesidade.",
          "Ajuste renal (fonte adulto, extrapolação p/ pediatria requer cautela): Clcr 60-79mL/min — 4mg/kg a cada 24h; Clcr 50mL/min — 3,5mg/kg a cada 24h; Clcr 40mL/min — 2,5mg/kg a cada 24h; Clcr < 30mL/min — dose íntegra inicial, doses seguintes guiadas por concentração sérica. Hemodiálise intermitente: administrar após a sessão. FDA reforça: em insuficiência renal, usar o ajuste baseado em creatinina em vez das doses máximas padrão.",
          "Insuficiência hepática: monitorar concentração plasmática."
        ],
        "alerts": [
          "INCOMPATIBILIDADE FÍSICA COM PENICILINAS (ex.: ampicilina): mesma observação já registrada na entrada de ampicilina — aminoglicosídeos não devem ser misturados com penicilinas na mesma seringa/via, mesmo sendo combinação terapêutica comum (ex.: sepse neonatal, sinergismo contra Gram-negativos). Administrar sempre em horários/acessos separados."
        ],
        "calcNote": "Dose × Peso IDEAL ÷ 3 = dose por tomada (8/8h) — limitar a 7,5mg/kg/dia",
        "source": "Bula profissional (Hytamicina) + Guia Farmacêutico HSL + FDA (via pesquisa OpenEvidence)"
      },
      {
        "name": "Neonatos ≤ 1 semana de vida (pré-termo ou a termo)",
        "doseUnit": "mg/kg/dia",
        "doseMin": 5,
        "doseMax": 5,
        "dosesPerDay": 2,
        "doseDefault": 5,
        "ageWarning": "Restrito a neonatos com 1 semana de vida ou menos, pré-termo ou a termo. Acima de 1 semana, usar a indicação \"pediatria (função renal normal)\" desta droga.",
        "specialConsiderations": [
          "Dose máxima: 5mg/kg/dia, administrada como 2,5mg/kg a cada 12 horas (dose menor e fracionamento mais espaçado que o resto da pediatria — reflete imaturidade renal nessa faixa etária).",
          "Mesmos alvos de concentração sérica da indicação geral (pico ≤ 12mcg/mL; vale ≤ 2mcg/mL) e mesma orientação de calcular sobre o peso ideal.",
          "Duração usual: 7-10 dias, com o mesmo alerta de monitoramento (renal/auditivo/vestibular) se o curso ultrapassar 10 dias."
        ],
        "alerts": [
          "INCOMPATIBILIDADE FÍSICA COM PENICILINAS (ex.: ampicilina): mesma observação da indicação geral — não misturar na mesma seringa/via, mesmo sendo a combinação clássica em sepse neonatal."
        ],
        "calcNote": "Dose × Peso IDEAL ÷ 2 = dose por tomada (12/12h) — limitar a 5mg/kg/dia",
        "source": "FDA (via pesquisa OpenEvidence)"
      }
    ]
  }
]
;