// src/data/contestantsPool.ts

export type SkillLevel = "esperto" | "medio" | "scarso";

export interface Contestant {
  name: string;
  gender: "M" | "F";
  level: SkillLevel;
  region: string;
}


const contestantsPool: Contestant[] = [

  { name: "Mario Rossi", gender: "M", level: "medio", region: "Lombardia" },
  { name: "Giulia Bianchi", gender: "F", level: "esperto", region: "Puglia" },
  { name: "Luca Verdi", gender: "M", level: "scarso", region: "Liguria" },
  { name: "Anna Neri", gender: "F", level: "medio", region: "Umbria" },
  { name: "Paolo Gallo", gender: "M", level: "esperto", region: "Toscana" },
  { name: "Sara Fontana", gender: "F", level: "scarso", region: "Sicilia" },
  { name: "Francesco Colombo", gender: "M", level: "medio", region: "Piemonte" },
  { name: "Martina Ferri", gender: "F", level: "esperto", region: "Lazio" },
  { name: "Alessandro De Luca", gender: "M", level: "scarso", region: "Basilicata" },
  { name: "Chiara Romano", gender: "F", level: "medio", region: "Trentino-Alto Adige" },
  { name: "Giovanni Vitale", gender: "M", level: "scarso", region: "Molise" },
  { name: "Federica Conti", gender: "F", level: "medio", region: "Abruzzo" },
  { name: "Simone Greco", gender: "M", level: "esperto", region: "Calabria" },
  { name: "Laura Moretti", gender: "F", level: "scarso", region: "Veneto" },
  { name: "Davide Bianco", gender: "M", level: "medio", region: "Marche" },
  { name: "Valentina Marchetti", gender: "F", level: "scarso", region: "Valle d'Aosta" },
  { name: "Andrea Sanna", gender: "M", level: "medio", region: "Friuli-Venezia Giulia" },
  { name: "Roberta Testa", gender: "F", level: "esperto", region: "Campania" },
  { name: "Enrico Pellegrini", gender: "M", level: "scarso", region: "Sardegna" },
  { name: "Ilaria Gatti", gender: "F", level: "medio", region: "Emilia-Romagna" },
  { name: "Marco Serra", gender: "M", level: "scarso", region: "Lombardia" },
  { name: "Elisa Monti", gender: "F", level: "medio", region: "Puglia" },
  { name: "Gabriele Gentile", gender: "M", level: "esperto", region: "Liguria" },
  { name: "Monica Riva", gender: "F", level: "medio", region: "Umbria" },
  { name: "Daniele Leone", gender: "M", level: "scarso", region: "Toscana" },
  { name: "Barbara Fabbri", gender: "F", level: "scarso", region: "Sicilia" },
  { name: "Riccardo Benedetti", gender: "M", level: "medio", region: "Piemonte" },
  { name: "Stefania Costa", gender: "F", level: "medio", region: "Lazio" },
  { name: "Pietro Longo", gender: "M", level: "esperto", region: "Basilicata" },
  { name: "Angela Grassi", gender: "F", level: "scarso", region: "Trentino-Alto Adige" },
  { name: "Fabio De Angelis", gender: "M", level: "medio", region: "Molise" },
  { name: "Vanessa Bellini", gender: "F", level: "medio", region: "Abruzzo" },
  { name: "Matteo Sartori", gender: "M", level: "scarso", region: "Calabria" },
  { name: "Giada Silvestri", gender: "F", level: "esperto", region: "Veneto" },
  { name: "Cristiano Villa", gender: "M", level: "medio", region: "Marche" },
  { name: "Noemi Farina", gender: "F", level: "scarso", region: "Valle d'Aosta" },
  { name: "Emanuele Rizzi", gender: "M", level: "scarso", region: "Friuli-Venezia Giulia" },
  { name: "Alessia Guerra", gender: "F", level: "medio", region: "Campania" },
  { name: "Lorenzo Caruso", gender: "M", level: "esperto", region: "Sardegna" },
  { name: "Isabella Parisi", gender: "F", level: "medio", region: "Emilia-Romagna" },
  { name: "Tommaso D'Amico", gender: "M", level: "scarso", region: "Lombardia" },
  { name: "Serena Basile", gender: "F", level: "medio", region: "Puglia" },
  { name: "Claudio Marchetti", gender: "M", level: "medio", region: "Liguria" },
  { name: "Nicoletta Lodi", gender: "F", level: "scarso", region: "Umbria" },
  { name: "Stefano Grelli", gender: "M", level: "esperto", region: "Toscana" },
  { name: "Rosa Venturi", gender: "F", level: "scarso", region: "Sicilia" },
  { name: "Dario Mancini", gender: "M", level: "medio", region: "Piemonte" },
  { name: "Camilla Barbieri", gender: "F", level: "medio", region: "Lazio" },
  { name: "Vincenzo Fiore", gender: "M", level: "scarso", region: "Basilicata" },
  { name: "Milena Russo", gender: "F", level: "medio", region: "Trentino-Alto Adige" },
  { name: "Giorgio Milani", gender: "M", level: "medio", region: "Molise" },
  { name: "Eleonora Pagani", gender: "F", level: "esperto", region: "Abruzzo" },
  { name: "Ignazio Barone", gender: "M", level: "scarso", region: "Calabria" },
  { name: "Letizia Alfieri", gender: "F", level: "scarso", region: "Veneto" },
  { name: "Renato Sarti", gender: "M", level: "medio", region: "Marche" },
  { name: "Daniela Colombo", gender: "F", level: "medio", region: "Valle d'Aosta" },
  { name: "Luciano Gallo", gender: "M", level: "esperto", region: "Friuli-Venezia Giulia" },
  { name: "Beatrice Pini", gender: "F", level: "medio", region: "Campania" },
  { name: "Omar Giuliani", gender: "M", level: "scarso", region: "Sardegna" },
  { name: "Annalisa Martelli", gender: "F", level: "scarso", region: "Emilia-Romagna" },
  { name: "Flavio Amato", gender: "M", level: "medio", region: "Lombardia" },
  { name: "Irene Vivaldi", gender: "F", level: "esperto", region: "Puglia" },
  { name: "Gianluca Sanna", gender: "M", level: "medio", region: "Liguria" },
  { name: "Alina Ruggieri", gender: "F", level: "medio", region: "Umbria" },
  { name: "Samuel Marino", gender: "M", level: "scarso", region: "Toscana" },
  { name: "Anita Gallo", gender: "F", level: "medio", region: "Sicilia" },
  { name: "Matilde Bruni", gender: "F", level: "medio", region: "Piemonte" },
  { name: "Ettore Neri", gender: "M", level: "scarso", region: "Lazio" },
  { name: "Gloria Lupo", gender: "F", level: "medio", region: "Basilicata" },
  { name: "Nadia Greco", gender: "F", level: "scarso", region: "Trentino-Alto Adige" },
  { name: "Leonardo Donati", gender: "M", level: "medio", region: "Molise" },
  { name: "Rachele Magri", gender: "F", level: "esperto", region: "Abruzzo" },
  { name: "Mirko D'Alessandro", gender: "M", level: "scarso", region: "Calabria" },
  { name: "Caterina Villa", gender: "F", level: "medio", region: "Veneto" },
  { name: "Sebastiano De Rosa", gender: "M", level: "esperto", region: "Marche" },
  { name: "Virginia Santoro", gender: "F", level: "scarso", region: "Valle d'Aosta" },
  { name: "Alberto Mazza", gender: "M", level: "medio", region: "Friuli-Venezia Giulia" },
  { name: "Cristina Neri", gender: "F", level: "medio", region: "Campania" },
  { name: "Gianmarco Valli", gender: "M", level: "scarso", region: "Sardegna" },
  { name: "Margherita Ricci", gender: "F", level: "scarso", region: "Emilia-Romagna" },
  { name: "Ludovico Barbera", gender: "M", level: "esperto", region: "Lombardia" },
  { name: "Tiziana Mori", gender: "F", level: "medio", region: "Puglia" },
  { name: "Diego Grassi", gender: "M", level: "medio", region: "Liguria" },
  { name: "Aurora Romano", gender: "F", level: "scarso", region: "Umbria" },
  { name: "Cesare Rinaldi", gender: "M", level: "medio", region: "Toscana" },
  { name: "Viviana Sanna", gender: "F", level: "scarso", region: "Sicilia" },
  { name: "Oscar Galli", gender: "M", level: "medio", region: "Piemonte" },
  { name: "Rebecca Luciani", gender: "F", level: "medio", region: "Lazio" },
  { name: "Maurizio Contini", gender: "M", level: "scarso", region: "Basilicata" },
  { name: "Lidia Verri", gender: "F", level: "esperto", region: "Trentino-Alto Adige" },
  { name: "Valerio Gentili", gender: "M", level: "medio", region: "Molise" },
  { name: "Elena Costanzo", gender: "F", level: "scarso", region: "Abruzzo" },
  { name: "Fabrizio Mazzola", gender: "M", level: "medio", region: "Calabria" },
  { name: "Cecilia Raimondi", gender: "F", level: "medio", region: "Veneto" },
  { name: "Adriano Sassi", gender: "M", level: "medio", region: "Marche" },
  { name: "Sabrina Parisi", gender: "F", level: "scarso", region: "Valle d'Aosta" },
  { name: "Teodoro Ferretti", gender: "M", level: "esperto", region: "Friuli-Venezia Giulia" },
  { name: "Erika Marchetti", gender: "F", level: "medio", region: "Campania" },
  { name: "Ruggero Pini", gender: "M", level: "scarso", region: "Sardegna" },
  { name: "Marina Bellini", gender: "F", level: "medio", region: "Emilia-Romagna" },
  { name: "Jacopo Giuliani", gender: "M", level: "medio", region: "Lombardia" },
  { name: "Asia De Santis", gender: "F", level: "scarso", region: "Puglia" },
  { name: "Raffaele Pellegrino", gender: "M", level: "medio", region: "Liguria" },
  { name: "Iside Fontana", gender: "F", level: "medio", region: "Umbria" },
  { name: "Elio Ruggieri", gender: "M", level: "scarso", region: "Toscana" },
  { name: "Melissa Sartori", gender: "F", level: "esperto", region: "Sicilia" },
  { name: "Carlo Lodi", gender: "M", level: "scarso", region: "Piemonte" },
  { name: "Tatiana Romano", gender: "F", level: "medio", region: "Lazio" },
  { name: "Eugenio Ferri", gender: "M", level: "medio", region: "Basilicata" },
  { name: "Clarissa Vitale", gender: "F", level: "scarso", region: "Trentino-Alto Adige" },
  { name: "Massimo D'Amato", gender: "M", level: "esperto", region: "Molise" },
  { name: "Daniela Milani", gender: "F", level: "medio", region: "Abruzzo" },
  { name: "Gregorio Serra", gender: "M", level: "medio", region: "Calabria" },
  { name: "Vera Valli", gender: "F", level: "scarso", region: "Veneto" },
  { name: "Lorenza Donati", gender: "F", level: "medio", region: "Marche" },
  { name: "Antonio De Rosa", gender: "M", level: "scarso", region: "Valle d'Aosta" },
  { name: "Pamela Venturi", gender: "F", level: "scarso", region: "Friuli-Venezia Giulia" },
  { name: "Domenico Parisi", gender: "M", level: "medio", region: "Campania" },
  { name: "Benedetta Mancini", gender: "F", level: "medio", region: "Sardegna" },
  { name: "Giampiero Conti", gender: "M", level: "medio", region: "Emilia-Romagna" },
  { name: "Sofia Farina", gender: "F", level: "scarso", region: "Lombardia" },
  { name: "Giada Moretti", gender: "F", level: "medio", region: "Puglia" },
  { name: "Saverio Pagani", gender: "M", level: "medio", region: "Liguria" },
  { name: "Cristina Colombo", gender: "F", level: "medio", region: "Umbria" },
  { name: "Damiano Gallo", gender: "M", level: "medio", region: "Toscana" },
  { name: "Veronica Testa", gender: "F", level: "scarso", region: "Sicilia" },
  { name: "Samuele Lupo", gender: "M", level: "medio", region: "Piemonte" },
  { name: "Flaminia Longo", gender: "F", level: "medio", region: "Lazio" },
  { name: "Beppe Bianco", gender: "M", level: "medio", region: "Basilicata" },
  { name: "Annamaria Sartori", gender: "F", level: "medio", region: "Trentino-Alto Adige" },
  { name: "Nicolò Fiore", gender: "M", level: "scarso", region: "Molise" },
  { name: "Angela Milani", gender: "F", level: "medio", region: "Abruzzo" },
  { name: "Enea Bellini", gender: "M", level: "medio", region: "Calabria" },
  { name: "Giovanna Alfieri", gender: "F", level: "scarso", region: "Veneto" },
  { name: "Giuliano De Luca", gender: "M", level: "medio", region: "Marche" },
  { name: "Camilla Benedetti", gender: "F", level: "medio", region: "Valle d'Aosta" },
  { name: "Ermanno Vitale", gender: "M", level: "scarso", region: "Friuli-Venezia Giulia" },
  { name: "Irene Fontana", gender: "F", level: "medio", region: "Campania" },
  { name: "Lucia Verri", gender: "F", level: "medio", region: "Sardegna" },
  { name: "Mattia Leone", gender: "M", level: "medio", region: "Emilia-Romagna" },
  { name: "Natalia Romano", gender: "F", level: "scarso", region: "Lombardia" },
  { name: "Umberto Sartori", gender: "M", level: "scarso", region: "Puglia" },
  { name: "Patrizia Neri", gender: "F", level: "medio", region: "Liguria" },
  { name: "Giosuè Colombo", gender: "M", level: "medio", region: "Umbria" },
  { name: "Luna Grassi", gender: "F", level: "medio", region: "Toscana" },
  { name: "Renata Testa", gender: "F", level: "scarso", region: "Sicilia" }
];


export default contestantsPool;
