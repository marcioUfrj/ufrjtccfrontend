export const backendURLlocal = "http://localhost:4000"
export const backendURL = "https://tccmarcioconceito.herokuapp.com"

export const pages = {
  HOME: "Home",
  LESSONS: "Lições",
  EXAM: "Avaliações",
  ABOUT: "Sobre"
}

export const phases = {
  PREPARATION: "preparation",
  WAIT: "wait",
  ANSWER: "answer",
  END: "end"
}

export const lessonPhases = {
  LEVEL: 1,
  CANDO: 2,
  EXERCISE: 3,
  REPORT: 4
}

export const roles = {
  ADMIN: "admin",
  USER: "user"
}

export const nivelCEFRobj = {
  A1: "A1",
  A2: "A2",
  B1: "B1",
  B2: "B2",
  C1: "C1",
  C2: "C2"
}

export const nivelCEFRvector = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2"
]

export const nivelJLPTobj = {
  N5: "N5",
  N4: "N4",
  N3: "N3",
  N2: "N2",
  N1: "N1"
}

export const nivelJLPTvector = [
  "N5",
  "N4",
  "N3",
  "N2",
  "N1"
]

export const nivelShirai = [
  "DAI0",
  "DAI1",
  "DAI2",
  "DAI3",
  "DAI4",
  "DAI5",
  "DAI6",
  "DAI7",
  "DAI8",
  "DAI9",
  "DAI10",
  "DAI11",
  "DAI12",
  "DAI13",
  "DAI14",
  "DAI15",
  "DAI16",
  "DAI17",
  "DAI18",
  "DAI19",
  "DAI20",
  "DAI21",
  "DAI22",
  "DAI23",
  "DAI24",
  "DAI25",
  "DAI26",
  "DAI27",
  "DAI28",
  "DAI29",
]

export const reportHeaderCase1 = [
  { label: "UserID", key: "user_id"},
  { label: "Item", key: "idQuestion"},
  { label: "Skill", key: "idSkill"},
  { label: "Correct", key: "score"},
  { label: "Wins", key: "wins"},
  { label: "Fails", key: "falls"},
]

export const questionIds = new Map(
  [
    ["62fcff514c75500d5b38d8fd", 0],
    ["62d5d4b4971f290a664b101c", 1],
    ["62d5d4b4971f290a664b1020", 2],
    ["62d5d4b4971f290a664b1024", 3],
    ["62d5d4b4971f290a664b1028", 4],
    ["62d5d4b4971f290a664b102c", 5],
    ["62d5d4b4971f290a664b1030", 6],
    ["62d5d4b4971f290a664b1034", 7],
    ["62d5d4b4971f290a664b1038", 8],
    ["62d5d4b4971f290a664b103c", 9],
    ["62d5d4b4971f290a664b1040", 10],
    ["62d5d4b4971f290a664b1044", 11],
    ["62d5d4b4971f290a664b1048", 12],
    ["62d5d4b4971f290a664b104c", 13],
    ["62d5d4b4971f290a664b1050", 14],
    ["62d5d4b4971f290a664b1054", 15],
    ["62d5d4b4971f290a664b1058", 16],
    ["62d5d4b4971f290a664b105c", 17],
    ["62d5d4b4971f290a664b1060", 18],
    ["62d5d4b4971f290a664b1064", 19],
    ["62ced00c18fbfdd252508662", 20],
    ["62ced00c18fbfdd252508667", 21],
    ["62ced00c18fbfdd25250866c", 22],
    ["62ced00c18fbfdd252508671", 23],
    ["62ced00c18fbfdd252508676", 24],
    ["62ced00c18fbfdd25250867b", 25],
    ["62ced00c18fbfdd252508680", 26],
    ["62ced00c18fbfdd252508685", 27],
    ["62ced00c18fbfdd25250868a", 28],
    ["62ced00c18fbfdd25250868f", 29],
    ["62ced00c18fbfdd252508694", 30],
    ["62ced00c18fbfdd252508699", 31],
    ["62ced00c18fbfdd25250869e", 32],
    ["62ced00c18fbfdd2525086a3", 33],
    ["62ced00c18fbfdd2525086a8", 34],
    ["62ced00c18fbfdd2525086ad", 35],
    ["62ced00c18fbfdd2525086b2", 36],
    ["62ced00c18fbfdd2525086b7", 37],
    ["62ced00c18fbfdd2525086bc", 38],
    ["62ced00c18fbfdd2525086c1", 39],
    ["62ced00c18fbfdd2525086c6", 40],
    ["62ced00c18fbfdd2525086cb", 41],
    ["62ced00c18fbfdd2525086d0", 42],
    ["62ced00d18fbfdd2525086d5", 43],
    ["62ced00d18fbfdd2525086da", 44],
    ["62ced00d18fbfdd2525086df", 45],
    ["62ced00d18fbfdd2525086e4", 46],
    ["62ced00d18fbfdd2525086e9", 47],
    ["62ced00d18fbfdd2525086ee", 48],
    ["62ced00d18fbfdd2525086f3", 49],
    ["62ced00d18fbfdd2525086f8", 50],
    ["62ced00d18fbfdd2525086fd", 51]
  ]
)

export const coefsModel = new Map(
  [
    ["skill0", 0],
    ["skill1", 0.2973104138501465],
    ["skill2", 0.08215781399327927],
    ["wins0", 0],
    ["wins1", 0.08464545849359072],
    ["wins2", 0.09873039723301497],
    ["fails0", 0],
    ["fails1", -0.22452467666777523],
    ["fails2", -0.14993917700831852]
  ]
)