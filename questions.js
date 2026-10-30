/* Question bank: character -> role line + questions by difficulty */
const CHARS = {
  "Crisóstomo Ibarra": {
    role: "The young heir who returns from Europe",
    q: {
      // Easy
      e: [
        ["Where had Ibarra been studying for seven years before returning home?",
          ["Europe", "Japan", "Hong Kong", "Mexico"],
          0, "Ibarra returns to the Philippines after about seven years of study in Europe."],
      ],
      // Medium
      m: [
        ["What did Ibarra plan to build in San Diego?",
          ["A church", "A school", "A hospital", "A bridge"],
          1, "He wanted to build a schoolhouse, believing education would uplift the town."],
      ],
      // Hard
      h: [
        ["What was the name of Ibarra's father?",
          ["Don Pedro Eibarramendia", "Don Santiago de los Santos", "Don Rafael Ibarra", "Don Tiburcio de Espadaña"],
          2, "Don Rafael Ibarra died in prison. Don Pedro Eibarramendia was Ibarra's great-grandfather."],
      ],
    },
  },

  "María Clara": {
    role: "Ibarra's beloved",
    q: {
      // Easy
      e: [
        ["Who is María Clara to Ibarra?",
          ["His sister", "His fiancée", "His cousin", "His teacher"],
          1, "María Clara is Ibarra's childhood sweetheart and fiancée."],
      ],
      // Medium
      m: [
        ["Who is revealed to be María Clara's real father?",
          ["Kapitan Tiago", "Padre Salvi", "Padre Dámaso", "Tenyente Guevara"],
          2, "Padre Dámaso is her biological father; Kapitan Tiago raised her as his own."],
      ],
      // Hard
      h: [
        ["After Ibarra falls from favor, whom is María Clara arranged to marry?",
          ["Alfonso Linares", "Don Tiburcio", "The Alferez", "Elías"],
          0, "Linares, a young Spaniard linked to Doña Victorina, is chosen as her new groom."],
        ["Where does María Clara go at the end of the novel?",
          ["To Spain", "To the convent of Santa Clara", "To Ibarra's house", "To the lake"],
          1, "Heartbroken, she enters the nunnery of Santa Clara."],
      ],
    },
  },

  "Padre Dámaso": {
    role: "The proud Franciscan friar",
    q: {
      // Easy
      e: [
        ["To which religious order does Padre Dámaso belong?",
          ["Dominican", "Jesuit", "Franciscan", "Augustinian"],
          2, "Padre Dámaso is a Franciscan friar."],
      ],
      // Medium
      m: [
        ["Why did Ibarra nearly stab Padre Dámaso at the banquet?",
          ["Dámaso stole his money", "Dámaso insulted his dead father", "Dámaso hit María Clara", "Dámaso burned the school"],
          1, "Dámaso mocked the memory of Don Rafael, and Ibarra lost control."],
      ],
      // Hard
      h: [
        ["For how many years had Dámaso been the parish priest of San Diego?",
          ["5 years", "10 years", "20 years", "35 years"],
          2, "Dámaso boasts at the dinner that he served San Diego for twenty years."],
      ],
    },
  },

  "Elías": {
    role: "The mysterious boatman",
    q: {
      // Easy
      e: [
        ["What is Elías's work?",
          ["Boatman and pilot", "Teacher", "Soldier", "Sacristan"],
          0, "Elías works as a boatman (piloto) on the lake."],
      ],
      // Medium
      m: [
        ["How did Elías save Ibarra at the school's cornerstone ceremony?",
          ["He stopped a robber", "He warned him of a poisoned drink", "He saved him from a falling derrick", "He hid him in a church"],
          2, "The derrick was rigged to fall on Ibarra; Elías saved him and the man who rigged it died."],
      ],
      // Hard
      h: [
        ["Whose ancestor caused the ruin of Elías's family?",
          ["Padre Dámaso's", "Ibarra's", "Kapitan Tiago's", "The Alferez's"],
          1, "Ibarra's great-grandfather falsely accused Elías's grandfather, ruining the family."],
      ],
    },
  },

  "Sisa": {
    role: "The mother who lost her sons",
    q: {
      // Easy
      e: [
        ["Who are Sisa's two sons?",
          ["Basilio and Crispín", "Elías and Lucas", "Tasio and Tiago", "Linares and Tiburcio"],
          0, "Sisa's sons are Basilio, the elder, and Crispín."],
      ],
      // Medium
      m: [
        ["What happens to Sisa after her sons vanish and she is mistreated?",
          ["She becomes rich", "She loses her sanity", "She becomes a nun", "She leaves for Manila"],
          1, "Grief and abuse drive Sisa mad; she wanders the town calling for her sons."],
      ],
      // Hard
      h: [
        ["How does Sisa's story end?",
          ["She reunites with Crispín", "She dies in the forest with Basilio beside her", "She is jailed for life", "She marries Elías"],
          1, "She dies on Christmas Eve after recognizing Basilio, who finds her in the forest."],
      ],
    },
  },

  "Crispín": {
    role: "Sisa's younger son",
    q: {
      // Easy
      e: [
        ["What is Crispín's job in the church?",
          ["Sacristan (altar boy and bell ringer)", "Cook", "Gardener", "Priest"],
          0, "Crispín and Basilio serve as sacristans and ring the church bells."],
      ],
      // Medium
      m: [
        ["What is Crispín falsely accused of stealing?",
          ["A gold chalice", "Two gold coins (onzas)", "A horse", "A rosary"],
          1, "He is accused of stealing two onzas and is beaten for it."],
      ],
      // Hard
      h: [
        ["Who accuses and beats Crispín?",
          ["Padre Dámaso", "The sacristan mayor (head sacristan)", "The Alferez", "Kapitan Tiago"],
          1, "The head sacristan beats him to make him return money he never took."],
      ],
    },
  },

  "Basilio": {
    role: "Sisa's elder son",
    q: {
      // Easy
      e: [
        ["Is Basilio Sisa's elder or younger son?",
          ["Elder", "Younger", "Only son", "Adopted son"],
          0, "Basilio is the elder son; Crispín is the younger."],
      ],
      // Medium
      m: [
        ["What does the dying Elías ask Basilio to do?",
          ["Find Ibarra", "Burn their bodies on a pyre and dig for treasure", "Go to Spain", "Become a priest"],
          1, "Elías asks him to burn the bodies and dig up buried treasure for himself."],
      ],
      // Hard
      h: [
        ["In the sequel El Filibusterismo, what does Basilio study?",
          ["Law", "Medicine", "Theology", "Engineering"],
          1, "Basilio grows up to become a medical student."],
      ],
    },
  },

  "Padre Salvi": {
    role: "The new parish priest of San Diego",
    q: {
      // Easy
      e: [
        ["Who replaces Padre Dámaso as parish priest of San Diego?",
          ["Padre Salvi", "Padre Sibyla", "Tasio", "Elías"],
          0, "Padre Salvi, a younger Franciscan, takes over the parish."],
      ],
      // Medium
      m: [
        ["Why does Padre Salvi secretly watch María Clara?",
          ["He is her guard", "He is obsessed with her", "She owes him money", "He is her father"],
          1, "Salvi harbors a hidden, improper obsession with María Clara."],
      ],
      // Hard
      h: [
        ["How is Padre Salvi described physically, unlike Dámaso?",
          ["Fat and loud", "Thin and sickly-looking", "Tall and strong", "Old and blind"],
          1, "Salvi is thin and pale, the opposite of the hefty Dámaso."],
      ],
    },
  },

  "Kapitan Tiago": {
    role: "Rich host of the opening dinner",
    q: {
      // Easy
      e: [
        ["What is Kapitan Tiago's real name?",
          ["Don Santiago de los Santos", "Don Rafael Ibarra", "Don Tiburcio", "Don Filipo"],
          0, "Kapitan Tiago is Don Santiago de los Santos."],
      ],
      // Medium
      m: [
        ["Where is the dinner party at the start of the novel held?",
          ["Ibarra's house", "Kapitan Tiago's house on Calle Anloague", "The convent", "Malacañang"],
          1, "The novel opens with a dinner at Kapitan Tiago's house on Anloague Street."],
      ],
      // Hard
      h: [
        ["What becomes of Kapitan Tiago by the end of the novel?",
          ["He becomes mayor", "He is addicted to opium", "He sails to Spain", "He becomes a friar"],
          1, "Broken by events, he wastes away as an opium addict."],
      ],
    },
  },

  "Doña Victorina": {
    role: "The woman who pretends to be Spanish",
    q: {
      // Easy
      e: [
        ["What does Doña Victorina pretend to be?",
          ["A nun", "A Spanish lady", "A doctor", "A teacher"],
          1, "She paints her face and imitates Spanish ways, ashamed of being Filipina."],
      ],
      // Medium
      m: [
        ["What does her husband, Don Tiburcio, pretend to be?",
          ["A lawyer", "A priest", "A doctor", "A soldier"],
          2, "Don Tiburcio de Espadaña poses as a medical doctor without real training."],
      ],
      // Hard
      h: [
        ["Doña Victorina gets into a public fight with which woman?",
          ["María Clara", "Sisa", "Doña Consolación", "Tía Isabel"],
          2, "She quarrels with Doña Consolación, the Alferez's wife."],
      ],
    },
  },

  "Pilosopo Tasio": {
    role: "The town's scholar",
    q: {
      // Easy
      e: [
        ["What do townspeople call Tasio?",
          ["The Saint", "The Philosopher or the Madman", "The General", "The Doctor"],
          1, "He is 'Pilosopo Tasio' to some and a madman to others."],
      ],
      // Medium
      m: [
        ["Why does Tasio write in hieroglyphics?",
          ["To hide money", "So only future generations can read it", "Because he cannot write Spanish", "To please the friars"],
          1, "He writes for wiser future generations, not the people of his own time."],
      ],
      // Hard
      h: [
        ["Tasio warns Ibarra that his school plan will succeed only if he gets the support of whom?",
          ["The townspeople", "The friars", "The Governor of Spain", "The army"],
          1, "Tasio advises Ibarra to win the friars' favor, since they hold real power."],
      ],
    },
  },

  "Tenyente Guevara": {
    role: "The officer who tells the truth",
    q: {
      // Medium
      m: [
        ["What does Tenyente Guevara tell Ibarra?",
          ["Where the treasure is", "How his father died in prison", "Who María Clara's father is", "When the uprising will start"],
          1, "Guevara reveals how Don Rafael was jailed and died in prison."],
      ],
      // Hard
      h: [
        ["What happened to Don Rafael's body?",
          ["It was buried in Spain", "It was thrown into the lake", "It was burned in the plaza", "It was placed in the cathedral"],
          1, "Ordered moved to the Chinese cemetery, the gravedigger threw it into the lake instead."],
      ],
    },
  },

  "Doña Consolación": {
    role: "Wife of the Alferez",
    q: {
      // Easy
      e: [
        ["Who is Doña Consolación's husband?",
          ["The Alferez (head of the Guardia Civil)", "Kapitan Tiago", "Padre Salvi", "Don Tiburcio"],
          0, "She is the wife of the Alferez of San Diego."],
      ],
      // Medium
      m: [
        ["Whom does Doña Consolación torment by forcing her to sing and dance?",
          ["María Clara", "Sisa", "Tía Isabel", "Doña Victorina"],
          1, "She cruelly abuses Sisa while Sisa is held at the barracks."],
      ],
    },
  },
};
