// 名称: 批量生成的公共节假日数据
// 描述: 由 Nager.Date Public Holidays API 生成，用于补齐 2026/2027 年国家法定节假日明细
// 路径: Globokit/lib/tools/holiday-query-generated.ts
// 作者: Jensfrank / Codex
// 更新时间: 2026-07-06

import type { Holiday } from './holiday-query'

export const generatedHolidaySource = {
  provider: 'Nager.Date',
  availableCountriesEndpoint: 'https://date.nager.at/api/v3/AvailableCountries',
  publicHolidaysEndpointPattern: 'https://date.nager.at/api/v3/PublicHolidays/{year}/{countryCode}',
  includedTypes: ['Public', 'Bank', 'Authorities'],
  generatedAt: '2026-07-06',
}

export const generatedHolidayUnsupportedCountryCodes = [
  "AE",
  "AF",
  "AZ",
  "BF",
  "BH",
  "BN",
  "BT",
  "CI",
  "DJ",
  "ER",
  "ET",
  "FJ",
  "IL",
  "IN",
  "IQ",
  "IR",
  "JO",
  "KG",
  "KP",
  "KW",
  "LA",
  "LB",
  "LK",
  "LY",
  "ML",
  "MM",
  "MO",
  "MU",
  "MV",
  "MY",
  "NP",
  "OM",
  "PF",
  "PK",
  "QA",
  "SA",
  "SB",
  "SD",
  "SN",
  "SO",
  "SY",
  "TH",
  "TJ",
  "TL",
  "TM",
  "TO",
  "TW",
  "TZ",
  "UZ",
  "VU",
  "YE"
]

export const generatedHolidays2026: Record<string, Holiday[]> = {
  "AG": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-04",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-03",
      "name": "Carnival Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-04",
      "name": "Carnival Tuesday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-09-10",
      "name": "National Day of Prayer",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-11-02",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-09",
      "name": "National Heroes' Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "AM": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Ամանոր"
    },
    {
      "date": "2026-01-02",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Ամանոր"
    },
    {
      "date": "2026-01-05",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Սուրբ Ծնունդ"
    },
    {
      "date": "2026-01-06",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Սուրբ Ծնունդ"
    },
    {
      "date": "2026-01-28",
      "name": "Army Day",
      "type": "public",
      "impact": "medium",
      "localName": "Բանակի օր"
    },
    {
      "date": "2026-03-08",
      "name": "Women's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Կանանց տոն"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Ամանոր"
    },
    {
      "date": "2026-04-24",
      "name": "Armenian Genocide Remembrance Day",
      "type": "public",
      "impact": "medium",
      "localName": "Եղեռնի զոհերի հիշատակի օր"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Աշխատանքի օր"
    },
    {
      "date": "2026-05-09",
      "name": "Victory and Peace Day",
      "type": "public",
      "impact": "high",
      "localName": "Հաղթանակի և Խաղաղության տոն"
    },
    {
      "date": "2026-05-28",
      "name": "Republic Day",
      "type": "public",
      "impact": "high",
      "localName": "Հանրապետության օր"
    },
    {
      "date": "2026-07-05",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Սահմանադրության օր"
    },
    {
      "date": "2026-09-21",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Անկախության օր"
    },
    {
      "date": "2026-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high",
      "localName": "Ամանոր"
    }
  ],
  "AO": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia de Ano Novo"
    },
    {
      "date": "2026-01-02",
      "name": "New Year's Day (Ponte)",
      "type": "public",
      "impact": "high",
      "localName": "Dia de Ano Novo (Ponte)"
    },
    {
      "date": "2026-02-04",
      "name": "Liberation Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia da Libertação"
    },
    {
      "date": "2026-02-16",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2026-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia Internacional da Mulher"
    },
    {
      "date": "2026-03-23",
      "name": "Day of the Liberation of Southern Africa",
      "type": "public",
      "impact": "high",
      "localName": "Dia da Libertação da África Austral"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Sexta Feira Santa"
    },
    {
      "date": "2026-04-04",
      "name": "Peace Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia da Paz"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia do Trabalhador"
    },
    {
      "date": "2026-09-17",
      "name": "National Heroes' Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia do Fundador da Nação e do Herói Nacional"
    },
    {
      "date": "2026-09-18",
      "name": "National Heroes' Day (Ponte)",
      "type": "public",
      "impact": "high",
      "localName": "Dia do Fundador da Nação e do Herói Nacional (Ponte)"
    },
    {
      "date": "2026-11-02",
      "name": "All Souls' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de Finados"
    },
    {
      "date": "2026-11-11",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia da Independência"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia de Natal"
    }
  ],
  "AR": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2026-02-16",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2026-02-17",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2026-03-24",
      "name": "Day of Remembrance for Truth and Justice",
      "type": "public",
      "impact": "medium",
      "localName": "Día Nacional de la Memoria por la Verdad y la Justicia"
    },
    {
      "date": "2026-04-02",
      "name": "Day of the Veterans and Fallen of the Malvinas War",
      "type": "public",
      "impact": "medium",
      "localName": "Día del Veterano y de los Caídos en la Guerra de Malvinas"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día del Trabajador"
    },
    {
      "date": "2026-05-25",
      "name": "May Revolution",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Revolución de Mayo"
    },
    {
      "date": "2026-06-15",
      "name": "Anniversary of the Passing of General Martín Miguel de Güemes",
      "type": "public",
      "impact": "medium",
      "localName": "Paso a la Inmortalidad del General Martín Miguel de Güemes"
    },
    {
      "date": "2026-06-20",
      "name": "General Manuel Belgrano Memorial Day",
      "type": "public",
      "impact": "medium",
      "localName": "Paso a la Inmortalidad del General Manuel Belgrano"
    },
    {
      "date": "2026-07-09",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia"
    },
    {
      "date": "2026-08-17",
      "name": "General José de San Martín Memorial Day",
      "type": "public",
      "impact": "medium",
      "localName": "Paso a la Inmortalidad del General José de San Martín"
    },
    {
      "date": "2026-10-12",
      "name": "Day of Respect for Cultural Diversity",
      "type": "public",
      "impact": "medium",
      "localName": "Día del Respeto a la Diversidad Cultural"
    },
    {
      "date": "2026-11-23",
      "name": "National Sovereignty Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Soberanía Nacional"
    },
    {
      "date": "2026-12-08",
      "name": "Immaculate Conception Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Inmaculada Concepción de María"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "AT": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Neujahr"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Heilige Drei Könige"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Ostersonntag"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Ostermontag"
    },
    {
      "date": "2026-05-01",
      "name": "National Holiday",
      "type": "public",
      "impact": "high",
      "localName": "Staatsfeiertag"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Christi Himmelfahrt"
    },
    {
      "date": "2026-05-24",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Pfingstsonntag"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Pfingstmontag"
    },
    {
      "date": "2026-06-04",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium",
      "localName": "Fronleichnam"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Maria Himmelfahrt"
    },
    {
      "date": "2026-10-26",
      "name": "National Holiday",
      "type": "public",
      "impact": "high",
      "localName": "Nationalfeiertag"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Allerheiligen"
    },
    {
      "date": "2026-12-08",
      "name": "Immaculate Conception",
      "type": "public",
      "impact": "medium",
      "localName": "Mariä Empfängnis"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Weihnachten"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Stefanitag"
    }
  ],
  "AU": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-26",
      "name": "Australia Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-03-02",
      "name": "Labour Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-03-09",
      "name": "Canberra Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-03-09",
      "name": "Adelaide Cup Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-03-09",
      "name": "Eight Hours Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-03-09",
      "name": "Labour Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-04",
      "name": "Holy Saturday",
      "type": "regional",
      "impact": "medium",
      "localName": "Easter Eve",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-25",
      "name": "Anzac Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-27",
      "name": "Anzac Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-05-04",
      "name": "May Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-05-04",
      "name": "Labour Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-06-01",
      "name": "Reconciliation Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-06-01",
      "name": "Western Australia Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-06-08",
      "name": "King's Birthday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-08-03",
      "name": "Picnic Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-09-25",
      "name": "Friday before AFL Grand Final",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-09-28",
      "name": "King's Birthday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-10-05",
      "name": "Labour Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-10-05",
      "name": "King's Birthday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-11-03",
      "name": "Melbourne Cup",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-28",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "AW": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nieuwjaarsdag"
    },
    {
      "date": "2026-01-25",
      "name": "Betico Croes Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dag van Betico Croes"
    },
    {
      "date": "2026-02-16",
      "name": "Carnival Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval Maandag"
    },
    {
      "date": "2026-03-18",
      "name": "National Anthem and Flag Day",
      "type": "public",
      "impact": "high",
      "localName": "Dag van het Volkslied en de Vlag"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Goede Vrijdag"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Eerste Paasdag"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Tweede Paasedag"
    },
    {
      "date": "2026-04-27",
      "name": "King's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Koningsdag"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Dag van de Arbeid"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Hemelvaartsdag"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Eerste Kerstdag"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Tweede Kerstdag"
    }
  ],
  "BB": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-21",
      "name": "Errol Barrow Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-28",
      "name": "National Heroes' Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-01",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-03",
      "name": "Kadooment Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-11-30",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "BD": [
    {
      "date": "2026-02-21",
      "name": "International Mother Language Day",
      "type": "public",
      "impact": "high",
      "localName": "শহিদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস"
    },
    {
      "date": "2026-03-26",
      "name": "Independence and National Day",
      "type": "public",
      "impact": "high",
      "localName": "স্বাধীনতা ও জাতীয় দিবস"
    },
    {
      "date": "2026-04-14",
      "name": "Bengali New Year",
      "type": "public",
      "impact": "high",
      "localName": "নববর্ষ"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "মে দিবস"
    },
    {
      "date": "2026-08-05",
      "name": "July Mass Uprising Day",
      "type": "public",
      "impact": "medium",
      "localName": "জুলাই গণঅভ্যুত্থান দিবস"
    },
    {
      "date": "2026-12-16",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "বিজয় দিবস"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "বড়দিন"
    }
  ],
  "BE": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nieuwjaar"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Goede Vrijdag"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Pasen"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Paasmaandag"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Dag van de arbeid"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Onze Lieve Heer hemel"
    },
    {
      "date": "2026-05-15",
      "name": "Day after Ascension Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Pinkstermaandag"
    },
    {
      "date": "2026-07-21",
      "name": "Belgian National Day",
      "type": "public",
      "impact": "high",
      "localName": "Nationale feestdag"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Onze Lieve Vrouw hemelvaart"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Allerheiligen"
    },
    {
      "date": "2026-11-11",
      "name": "Armistice Day",
      "type": "public",
      "impact": "medium",
      "localName": "Wapenstilstand"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Kerstdag"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "BG": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Нова година"
    },
    {
      "date": "2026-01-02",
      "name": "Currency change day",
      "type": "public",
      "impact": "medium",
      "localName": "Ден на валутната смяна"
    },
    {
      "date": "2026-03-03",
      "name": "Liberation Day",
      "type": "public",
      "impact": "high",
      "localName": "Ден на oсвобождението на България от Oсманско робство"
    },
    {
      "date": "2026-04-10",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Разпети петък"
    },
    {
      "date": "2026-04-11",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium",
      "localName": "Велика събота"
    },
    {
      "date": "2026-04-12",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Великден"
    },
    {
      "date": "2026-04-13",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Велики понеделник"
    },
    {
      "date": "2026-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "Ден на труда и на международната работническа солидарност"
    },
    {
      "date": "2026-05-06",
      "name": "Saint George's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Гергьовден, ден на храбростта и Българската армия"
    },
    {
      "date": "2026-05-25",
      "name": "Saints Cyril and Methodius Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ден на Българската просвета и култура и на славянската писменост"
    },
    {
      "date": "2026-09-07",
      "name": "Unification Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ден на съединението"
    },
    {
      "date": "2026-09-22",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Ден на независимостта на България"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Бъдни вечер"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Рождество Христово"
    },
    {
      "date": "2026-12-26",
      "name": "Second day of Christmas",
      "type": "public",
      "impact": "high",
      "localName": "Рождество Христово"
    }
  ],
  "BM": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-22",
      "name": "Bermuda Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-15",
      "name": "National Heroes Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-07-30",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-07-31",
      "name": "Mary Prince Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-09-07",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-11-11",
      "name": "Remembrance Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-28",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "BO": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2026-02-02",
      "name": "Feast of the Virgin of Candelaria",
      "type": "public",
      "impact": "medium",
      "localName": "Fiesta de la Virgen de Candelaria"
    },
    {
      "date": "2026-02-16",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Feriado por Carnaval"
    },
    {
      "date": "2026-02-17",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Feriado por Carnaval"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia del trabajo"
    },
    {
      "date": "2026-06-04",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-21",
      "name": "Andean New Year",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo Andino"
    },
    {
      "date": "2026-08-02",
      "name": "Agrarian Reform Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Revolución Agraria"
    },
    {
      "date": "2026-08-06",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia de la Patria"
    },
    {
      "date": "2026-11-02",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Todos Santos"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "BR": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Confraternização Universal"
    },
    {
      "date": "2026-02-16",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2026-02-17",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Sexta-feira Santa"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Domingo de Páscoa"
    },
    {
      "date": "2026-04-21",
      "name": "Tiradentes",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de Tiradentes"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia do Trabalhador"
    },
    {
      "date": "2026-06-04",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-07-09",
      "name": "Constitutionalist Revolution of 1932",
      "type": "regional",
      "impact": "medium",
      "localName": "Revolução Constitucionalista de 1932",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-09-07",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia da Independência"
    },
    {
      "date": "2026-10-12",
      "name": "Our Lady of Aparecida",
      "type": "public",
      "impact": "medium",
      "localName": "Nossa Senhora Aparecida"
    },
    {
      "date": "2026-11-02",
      "name": "All Souls' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de Finados"
    },
    {
      "date": "2026-11-15",
      "name": "Republic Proclamation Day",
      "type": "public",
      "impact": "high",
      "localName": "Proclamação da República"
    },
    {
      "date": "2026-11-20",
      "name": "Black Awareness Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia da Consciência Negra"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Natal"
    }
  ],
  "BS": [
    {
      "date": "2026-01-02",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-12",
      "name": "Majority Rule Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-03",
      "name": "Perry Christie Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-07-10",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-08-07",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-10-12",
      "name": "National Heroes' Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "BW": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-07-01",
      "name": "Sir Seretse Khama Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-07-20",
      "name": "Presidents' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-09-30",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-10-01",
      "name": "Botswana Day holiday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "BY": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Новы год"
    },
    {
      "date": "2026-01-02",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Новы год"
    },
    {
      "date": "2026-01-07",
      "name": "Christmas Day (Orthodox)",
      "type": "public",
      "impact": "high",
      "localName": "Каляды праваслаўныя"
    },
    {
      "date": "2026-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high",
      "localName": "Мiжнародны жаночы дзень"
    },
    {
      "date": "2026-04-21",
      "name": "Commemoration Day",
      "type": "public",
      "impact": "medium",
      "localName": "Радунiца"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Дзень працы"
    },
    {
      "date": "2026-05-09",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Дзень Перамогi"
    },
    {
      "date": "2026-07-03",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Дзень Незалежнасцi"
    },
    {
      "date": "2026-11-07",
      "name": "October Revolution Day",
      "type": "public",
      "impact": "medium",
      "localName": "Дзень Кастрычніцкай рэвалюцыі"
    },
    {
      "date": "2026-12-25",
      "name": "Catholic Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Каляды каталiцкiя"
    }
  ],
  "BZ": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-15",
      "name": "George Price Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-03-09",
      "name": "National Heroes and Benefactors Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-04",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-08-01",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-09-10",
      "name": "Saint George's Caye Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-09-21",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-11-19",
      "name": "Garifuna Settlement Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "CA": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-02-16",
      "name": "Louis Riel Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-02-16",
      "name": "Islander Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-02-16",
      "name": "Heritage Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-02-16",
      "name": "Family Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-03-17",
      "name": "Saint Patrick's Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-23",
      "name": "Saint George's Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-05-18",
      "name": "National Patriots' Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-05-18",
      "name": "Victoria Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-21",
      "name": "National Aboriginal Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-06-24",
      "name": "Discovery Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-06-24",
      "name": "National Holiday",
      "type": "regional",
      "impact": "medium",
      "localName": "Fête nationale du Québec",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-07-01",
      "name": "Canada Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-07-12",
      "name": "Orangemen's Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-08-03",
      "name": "Civic Holiday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-08-03",
      "name": "British Columbia Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-08-03",
      "name": "Heritage Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-08-03",
      "name": "New Brunswick Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-08-03",
      "name": "Natal Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-08-03",
      "name": "Saskatchewan Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-08-17",
      "name": "Gold Cup Parade Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-08-17",
      "name": "Discovery Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-09-07",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-09-30",
      "name": "National Day for Truth and Reconciliation",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-10-12",
      "name": "Thanksgiving",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-11-11",
      "name": "Armistice Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-11-11",
      "name": "Remembrance Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Boxing Day",
      "description": "地区性公共假日，具体影响以当地安排为准"
    }
  ],
  "CH": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Neujahr"
    },
    {
      "date": "2026-01-02",
      "name": "St. Berchtold's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Berchtoldstag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "regional",
      "impact": "medium",
      "localName": "Heilige Drei Könige",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-03-01",
      "name": "Republic Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Jahrestag der Ausrufung der Republik",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-03-19",
      "name": "Saint Joseph's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Josefstag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "regional",
      "impact": "medium",
      "localName": "Karfreitag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-04",
      "name": "Näfels procession",
      "type": "regional",
      "impact": "medium",
      "localName": "Näfelser Fahrt",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "regional",
      "impact": "medium",
      "localName": "Ostermontag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Tag der Arbeit",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Auffahrt"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "regional",
      "impact": "medium",
      "localName": "Pfingstmontag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-06-04",
      "name": "Corpus Christi",
      "type": "regional",
      "impact": "medium",
      "localName": "Fronleichnam",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-08-01",
      "name": "Swiss National Day",
      "type": "public",
      "impact": "high",
      "localName": "Bundesfeier"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption of the Virgin Mary",
      "type": "regional",
      "impact": "medium",
      "localName": "Maria Himmelfahrt",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-09-10",
      "name": "Geneva Prayday",
      "type": "regional",
      "impact": "medium",
      "localName": "Jeûne genevois",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-09-21",
      "name": "Federal Fast Monday",
      "type": "regional",
      "impact": "medium",
      "localName": "Bettagsmontag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Allerheiligen",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-12-08",
      "name": "Immaculate Conception",
      "type": "regional",
      "impact": "medium",
      "localName": "Mariä Empfängnis",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Weihnachten"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Stephanstag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-12-31",
      "name": "Restoration Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Restauration de la République",
      "description": "地区性公共假日，具体影响以当地安排为准"
    }
  ],
  "CL": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2026-04-04",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium",
      "localName": "Sábado Santo"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día del Trabajo"
    },
    {
      "date": "2026-05-21",
      "name": "Navy Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de las Glorias Navales"
    },
    {
      "date": "2026-06-07",
      "name": "Battle of Arica",
      "type": "regional",
      "impact": "medium",
      "localName": "Asalto y Toma del Morro de Arica",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-06-21",
      "name": "National Day of Indigenous Peoples",
      "type": "public",
      "impact": "high",
      "localName": "Día Nacional de los Pueblos Indígenas"
    },
    {
      "date": "2026-06-29",
      "name": "Saint Peter and Saint Paul",
      "type": "public",
      "impact": "medium",
      "localName": "San Pedro y San Pablo"
    },
    {
      "date": "2026-07-16",
      "name": "Our Lady of Mount Carmel",
      "type": "public",
      "impact": "medium",
      "localName": "Virgen del Carmen"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption of Mary",
      "type": "public",
      "impact": "medium",
      "localName": "Asunción de la Virgen"
    },
    {
      "date": "2026-09-18",
      "name": "National holiday",
      "type": "public",
      "impact": "high",
      "localName": "Fiestas Patrias"
    },
    {
      "date": "2026-09-19",
      "name": "Army Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de las Glorias del Ejército"
    },
    {
      "date": "2026-10-12",
      "name": "Columbus Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día del Descubrimiento de Dos Mundos"
    },
    {
      "date": "2026-10-31",
      "name": "Reformation Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día Nacional de las Iglesias Evangélicas y Protestantes"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Todos los Santos"
    },
    {
      "date": "2026-12-08",
      "name": "Immaculate Conception",
      "type": "public",
      "impact": "medium",
      "localName": "Inmaculada Concepción"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad / Natividad del Señor"
    }
  ],
  "CM": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-02-11",
      "name": "Youth Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-20",
      "name": "National Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "CN": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "元旦"
    },
    {
      "date": "2026-02-17",
      "name": "Chinese New Year (Spring Festival)",
      "type": "public",
      "impact": "high",
      "localName": "春节"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "劳动节"
    },
    {
      "date": "2026-06-19",
      "name": "Dragon Boat Festival",
      "type": "public",
      "impact": "medium",
      "localName": "端午节"
    },
    {
      "date": "2026-09-25",
      "name": "Mid-Autumn Festival",
      "type": "public",
      "impact": "medium",
      "localName": "中秋节"
    },
    {
      "date": "2026-10-01",
      "name": "National Day",
      "type": "public",
      "impact": "high",
      "localName": "国庆节"
    }
  ],
  "CO": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2026-01-12",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Día de los Reyes Magos"
    },
    {
      "date": "2026-03-23",
      "name": "Saint Joseph's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de San José"
    },
    {
      "date": "2026-04-02",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Jueves Santo"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Primero de Mayo"
    },
    {
      "date": "2026-05-18",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ascensión del señor"
    },
    {
      "date": "2026-06-08",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-15",
      "name": "Sacred Heart",
      "type": "public",
      "impact": "medium",
      "localName": "Sagrado Corazón"
    },
    {
      "date": "2026-06-29",
      "name": "Saint Peter and Saint Paul",
      "type": "public",
      "impact": "medium",
      "localName": "San Pedro y San Pablo"
    },
    {
      "date": "2026-07-13",
      "name": "Our Lady of Chiquinquirá Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Virgen de Chiquinquirá"
    },
    {
      "date": "2026-07-20",
      "name": "Declaration of Independence",
      "type": "public",
      "impact": "high",
      "localName": "Declaracion de la Independencia de Colombia"
    },
    {
      "date": "2026-08-07",
      "name": "Battle of Boyacá",
      "type": "public",
      "impact": "medium",
      "localName": "Batalla de Boyacá"
    },
    {
      "date": "2026-08-17",
      "name": "Assumption of Mary",
      "type": "public",
      "impact": "medium",
      "localName": "La Asunción"
    },
    {
      "date": "2026-10-12",
      "name": "Columbus Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Raza"
    },
    {
      "date": "2026-11-02",
      "name": "All Saints’ Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de los Santos"
    },
    {
      "date": "2026-11-16",
      "name": "Independence of Cartagena",
      "type": "public",
      "impact": "high",
      "localName": "Independencia de Cartagena"
    },
    {
      "date": "2026-12-08",
      "name": "Immaculate Conception",
      "type": "public",
      "impact": "medium",
      "localName": "La Inmaculada Concepción"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "CR": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2026-04-02",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Jueves Santo"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2026-04-11",
      "name": "Juan Santamaría Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Juan Santamaría"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día Internacional del Trabajo"
    },
    {
      "date": "2026-07-25",
      "name": "Annexation of the Party of Nicoya to Costa Rica",
      "type": "public",
      "impact": "medium",
      "localName": "Anexión del Partido de Nicoya a Costa Rica"
    },
    {
      "date": "2026-08-02",
      "name": "Feast of Our Lady of the Angels",
      "type": "public",
      "impact": "medium",
      "localName": "Fiesta de Nuestra Señora de los Ángeles"
    },
    {
      "date": "2026-08-15",
      "name": "Mother's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Madre"
    },
    {
      "date": "2026-09-15",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia"
    },
    {
      "date": "2026-12-01",
      "name": "Army Abolition Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Abolición del Ejército"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "CU": [
    {
      "date": "2026-01-01",
      "name": "Triumph of the Revolution",
      "type": "public",
      "impact": "medium",
      "localName": "Triunfo de la Revolución"
    },
    {
      "date": "2026-01-02",
      "name": "Victory of Fidel Castro",
      "type": "public",
      "impact": "high",
      "localName": "Día de Victoria de las Fuerzas Armadas"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de los trabajadores"
    },
    {
      "date": "2026-07-25",
      "name": "Day before the Commemoration of the Assault of the Moncada garrison",
      "type": "public",
      "impact": "medium",
      "localName": "Conmemoración del asalto a Moncada"
    },
    {
      "date": "2026-07-26",
      "name": "Commemoration of the Assault of the Moncada garrison",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Rebeldía Nacional"
    },
    {
      "date": "2026-07-27",
      "name": "Day after the Commemoration of the Assault of the Moncada garrison",
      "type": "public",
      "impact": "medium",
      "localName": "Conmemoración del asalto a Moncada"
    },
    {
      "date": "2026-10-10",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "CY": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Πρωτοχρονιά"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Θεοφάνεια"
    },
    {
      "date": "2026-02-23",
      "name": "Green Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Καθαρή Δευτέρα"
    },
    {
      "date": "2026-03-25",
      "name": "Greek Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Επέτειος Ελληνικής Ανεξαρτησίας"
    },
    {
      "date": "2026-04-01",
      "name": "Cyprus National Day",
      "type": "public",
      "impact": "high",
      "localName": "Κυπριακή Εθνική Επέτειος"
    },
    {
      "date": "2026-04-10",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Μεγάλη Παρασκευή"
    },
    {
      "date": "2026-04-13",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Δευτέρα της Διακαινησίμου"
    },
    {
      "date": "2026-04-14",
      "name": "Easter Tuesday",
      "type": "public",
      "impact": "high",
      "localName": "Τρίτη της Διακαινησίμου"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Πρωτομαγιά"
    },
    {
      "date": "2026-05-31",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Αγίου Πνεύματος"
    },
    {
      "date": "2026-06-01",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Δευτέρα Πεντηκοστής"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption of the Virgin Mary",
      "type": "public",
      "impact": "medium",
      "localName": "Η Κοίμησις της Θεοτόκου"
    },
    {
      "date": "2026-10-01",
      "name": "Cyprus Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Επέτειος Κυπριακής Ανεξαρτησίας"
    },
    {
      "date": "2026-10-28",
      "name": "Ohi Day",
      "type": "public",
      "impact": "medium",
      "localName": "Το Όχι"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Παραμονή Χριστουγέννων"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Χριστούγεννα"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Δεύτερη μέρα των Χριστουγέννων"
    }
  ],
  "CZ": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Den obnovy samostatného českého státu; Nový rok"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Velký pátek"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Velikonoční pondělí"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Svátek práce"
    },
    {
      "date": "2026-05-08",
      "name": "Liberation Day",
      "type": "public",
      "impact": "high",
      "localName": "Den vítězství"
    },
    {
      "date": "2026-07-05",
      "name": "Saints Cyril and Methodius Day",
      "type": "public",
      "impact": "medium",
      "localName": "Den slovanských věrozvěstů Cyrila a Metoděje"
    },
    {
      "date": "2026-07-06",
      "name": "Jan Hus Day",
      "type": "public",
      "impact": "medium",
      "localName": "Den upálení mistra Jana Husa"
    },
    {
      "date": "2026-09-28",
      "name": "St. Wenceslas Day",
      "type": "public",
      "impact": "medium",
      "localName": "Den české státnosti"
    },
    {
      "date": "2026-10-28",
      "name": "Independent Czechoslovak State Day",
      "type": "public",
      "impact": "medium",
      "localName": "Den vzniku samostatného československého státu"
    },
    {
      "date": "2026-11-17",
      "name": "Struggle for Freedom and Democracy Day",
      "type": "public",
      "impact": "medium",
      "localName": "Den boje za svobodu a demokracii a Mezinárodní den studentstva"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Štědrý den"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "1. svátek vánoční"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "2. svátek vánoční"
    }
  ],
  "DE": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Neujahr"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "regional",
      "impact": "medium",
      "localName": "Heilige Drei Könige",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-03-08",
      "name": "International Women's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Internationaler Frauentag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Karfreitag"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "regional",
      "impact": "medium",
      "localName": "Ostersonntag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Ostermontag"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Tag der Arbeit"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Christi Himmelfahrt"
    },
    {
      "date": "2026-05-24",
      "name": "Pentecost",
      "type": "regional",
      "impact": "medium",
      "localName": "Pfingstsonntag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Pfingstmontag"
    },
    {
      "date": "2026-06-04",
      "name": "Corpus Christi",
      "type": "regional",
      "impact": "medium",
      "localName": "Fronleichnam",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Mariä Himmelfahrt",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-09-20",
      "name": "World Children's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Weltkindertag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-10-03",
      "name": "German Unity Day",
      "type": "public",
      "impact": "medium",
      "localName": "Tag der Deutschen Einheit"
    },
    {
      "date": "2026-10-31",
      "name": "Reformation Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Reformationstag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Allerheiligen",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-11-18",
      "name": "Repentance and Prayer Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Buß- und Bettag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Erster Weihnachtstag"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Zweiter Weihnachtstag"
    }
  ],
  "DK": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nytårsdag"
    },
    {
      "date": "2026-04-02",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Skærtorsdag"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Langfredag"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Påskedag"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "2. Påskedag"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Kristi Himmelfartsdag"
    },
    {
      "date": "2026-05-15",
      "name": "Bank closing day",
      "type": "public",
      "impact": "medium",
      "localName": "Banklukkedag"
    },
    {
      "date": "2026-05-24",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Pinsedag"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "2. Pinsedag"
    },
    {
      "date": "2026-06-05",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Grundlovsdag"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Juleaftensdag"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Juledag / 1. juledag"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "2. juledag"
    },
    {
      "date": "2026-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high",
      "localName": "Nytårsaftensdag"
    }
  ],
  "DM": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-02-16",
      "name": "Carnival Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-02-17",
      "name": "Carnival Tuesday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-03",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-11-03",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-11-04",
      "name": "Community Service Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "DO": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de Año Nuevo"
    },
    {
      "date": "2026-01-06",
      "name": "Day of Kings",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Reyes"
    },
    {
      "date": "2026-01-21",
      "name": "Our Lady of Altagracia",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Nuestra Señora de la Altagracia"
    },
    {
      "date": "2026-01-26",
      "name": "Duarte's Birthday",
      "type": "public",
      "impact": "medium",
      "localName": "Día del Natalicio de Juan Pablo Duarte"
    },
    {
      "date": "2026-02-27",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia de la República Dominicana"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día del Trabajador"
    },
    {
      "date": "2026-05-28",
      "name": "Mother's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de las Madres"
    },
    {
      "date": "2026-06-04",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-16",
      "name": "Restoration Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Restauración Dominicana"
    },
    {
      "date": "2026-09-24",
      "name": "Our Lady of Mercy",
      "type": "public",
      "impact": "medium",
      "localName": "Nuestra Senora de las Mercedes"
    },
    {
      "date": "2026-11-06",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Constitución"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "DZ": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-12",
      "name": "Amazigh New Year",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-07-05",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-11-01",
      "name": "Revolution Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "EC": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2026-02-16",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2026-02-17",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-24",
      "name": "The Battle of Pichincha",
      "type": "public",
      "impact": "medium",
      "localName": "Batalla de Pichincha"
    },
    {
      "date": "2026-08-10",
      "name": "Declaration of Independence of Quito",
      "type": "public",
      "impact": "high",
      "localName": "Primer Grito de Independencia"
    },
    {
      "date": "2026-10-09",
      "name": "Independence of Guayaquil",
      "type": "public",
      "impact": "high",
      "localName": "Independencia de Guayaquil"
    },
    {
      "date": "2026-11-02",
      "name": "All Souls' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de los Difuntos, Día de Muertos"
    },
    {
      "date": "2026-11-03",
      "name": "Independence of Cuenca",
      "type": "public",
      "impact": "high",
      "localName": "Independencia de Cuenca"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de Navidad"
    }
  ],
  "EE": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "uusaasta"
    },
    {
      "date": "2026-02-24",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "iseseisvuspäev"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "suur reede"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "ülestõusmispühade 1. püha"
    },
    {
      "date": "2026-05-01",
      "name": "Spring Day",
      "type": "public",
      "impact": "medium",
      "localName": "kevadpüha"
    },
    {
      "date": "2026-05-24",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "nelipühade 1. püha"
    },
    {
      "date": "2026-06-23",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "võidupüha and jaanilaupäev"
    },
    {
      "date": "2026-06-24",
      "name": "Midsummer Day",
      "type": "public",
      "impact": "medium",
      "localName": "jaanipäev"
    },
    {
      "date": "2026-08-20",
      "name": "Day of Restoration of Independence",
      "type": "public",
      "impact": "high",
      "localName": "taasiseseisvumispäev"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "jõululaupäev"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "esimene jõulupüha"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "teine jõulupüha"
    }
  ],
  "EG": [
    {
      "date": "2026-01-07",
      "name": "Christmas Day (Orthodox)",
      "type": "public",
      "impact": "high",
      "localName": "عيد الميلاد المجيد"
    },
    {
      "date": "2026-01-25",
      "name": "Revolution Day 2011 / National Police Day",
      "type": "public",
      "impact": "high",
      "localName": "عيد الثورة 25 يناير"
    },
    {
      "date": "2026-04-25",
      "name": "Sinai Liberation Day",
      "type": "public",
      "impact": "high",
      "localName": "عيد تحرير سيناء"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "عيد العمال"
    },
    {
      "date": "2026-07-02",
      "name": "June 30 Revolution",
      "type": "public",
      "impact": "medium",
      "localName": "ثورة 30 يونيو"
    },
    {
      "date": "2026-07-23",
      "name": "Revolution Day",
      "type": "public",
      "impact": "medium",
      "localName": "عيد ثورة 23 يوليو"
    },
    {
      "date": "2026-10-06",
      "name": "Armed Forces Day",
      "type": "public",
      "impact": "medium",
      "localName": "عيد القوات المسلحة"
    }
  ],
  "ES": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Reyes / Epifanía del Señor"
    },
    {
      "date": "2026-02-28",
      "name": "Day of Andalucía",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de Andalucía",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-03-01",
      "name": "Day of the Balearic Islands",
      "type": "regional",
      "impact": "medium",
      "localName": "Dia de les Illes Balears",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-02",
      "name": "Maundy Thursday",
      "type": "regional",
      "impact": "medium",
      "localName": "Jueves Santo",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "regional",
      "impact": "medium",
      "localName": "Lunes de Pascua",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-23",
      "name": "Castile and León Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de Castilla y León",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-23",
      "name": "Day of Aragón",
      "type": "regional",
      "impact": "medium",
      "localName": "San Jorge (Día de Aragón)",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Fiesta del trabajo"
    },
    {
      "date": "2026-05-02",
      "name": "Day of Madrid",
      "type": "regional",
      "impact": "medium",
      "localName": "Fiesta de la Comunidad de Madrid",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-05-17",
      "name": "Galician Literature Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Día das Letras Galegas",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-05-30",
      "name": "Day of the Canary Islands",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de Canarias",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-05-31",
      "name": "Day of Castilla-La Mancha",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de la Región Castilla-La Mancha",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-06-04",
      "name": "Corpus Christi",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-06-09",
      "name": "Day of La Rioja",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de La Rioja",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-06-09",
      "name": "Day of Murcia",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de la Región de Murcia",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-06-24",
      "name": "St. John's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Sant Joan",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-07-25",
      "name": "Santiago Apóstol",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-07-28",
      "name": "Day of the Cantabrian Institutions",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de las Instituciones de Cantabria",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption",
      "type": "public",
      "impact": "medium",
      "localName": "Asunción"
    },
    {
      "date": "2026-09-08",
      "name": "Day of Asturias",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de Asturias",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-09-08",
      "name": "Day of Extremadura",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de Extremadura",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-09-11",
      "name": "National Day of Catalonia",
      "type": "regional",
      "impact": "medium",
      "localName": "Diada Nacional de Catalunya",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-09-15",
      "name": "Feast of Our Lady of Bien Aparecida",
      "type": "regional",
      "impact": "medium",
      "localName": "Festividad de la Bien Aparecida",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-10-09",
      "name": "Day of the Valencian Community",
      "type": "regional",
      "impact": "medium",
      "localName": "Dia de la Comunitat Valenciana",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-10-12",
      "name": "National Day of Spain",
      "type": "public",
      "impact": "high",
      "localName": "Fiesta Nacional de España"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de todos los Santos"
    },
    {
      "date": "2026-12-06",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Constitución"
    },
    {
      "date": "2026-12-08",
      "name": "Immaculate Conception",
      "type": "public",
      "impact": "medium",
      "localName": "Inmaculada Concepción"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Feast of Saint Stephen",
      "description": "地区性公共假日，具体影响以当地安排为准"
    }
  ],
  "FI": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Uudenvuodenpäivä"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Loppiainen"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Pitkäperjantai"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Pääsiäispäivä"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Toinen pääsiäispäivä"
    },
    {
      "date": "2026-05-01",
      "name": "May Day",
      "type": "public",
      "impact": "medium",
      "localName": "Vappu"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Helatorstai"
    },
    {
      "date": "2026-05-24",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Helluntaipäivä"
    },
    {
      "date": "2026-06-19",
      "name": "Midsummer Eve",
      "type": "public",
      "impact": "medium",
      "localName": "Juhannusaatto"
    },
    {
      "date": "2026-06-20",
      "name": "Midsummer Day",
      "type": "public",
      "impact": "medium",
      "localName": "Juhannuspäivä"
    },
    {
      "date": "2026-10-31",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Pyhäinpäivä"
    },
    {
      "date": "2026-12-06",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Itsenäisyyspäivä"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Jouluaatto"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Joulupäivä"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Tapaninpäivä"
    }
  ],
  "FR": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Jour de l'an"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Lundi de Pâques"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête du Travail"
    },
    {
      "date": "2026-05-08",
      "name": "Victory in Europe Day",
      "type": "public",
      "impact": "high",
      "localName": "Victoire 1945"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ascension"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Lundi de Pentecôte"
    },
    {
      "date": "2026-07-14",
      "name": "Bastille Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête nationale"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Assomption"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Toussaint"
    },
    {
      "date": "2026-11-11",
      "name": "Armistice Day",
      "type": "public",
      "impact": "medium",
      "localName": "Armistice 1918"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Noël"
    }
  ],
  "GB": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-01-02",
      "name": "2 January",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-03-17",
      "name": "Saint Patrick's Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-05-04",
      "name": "Early May Bank Holiday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-25",
      "name": "Spring Bank Holiday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-15",
      "name": "World Cup Bank Holiday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-07-13",
      "name": "Battle of the Boyne",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-08-03",
      "name": "Summer Bank Holiday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-08-31",
      "name": "Summer Bank Holiday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-11-30",
      "name": "Saint Andrew's Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-28",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "GD": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-02-07",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Indian Arrival Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-04",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-03",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-11",
      "name": "Carnival",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-10-25",
      "name": "Thanksgiving Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "GE": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "ახალი წელი"
    },
    {
      "date": "2026-01-02",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "ახალი წელი"
    },
    {
      "date": "2026-01-07",
      "name": "Christmas Day (Orthodox)",
      "type": "public",
      "impact": "high",
      "localName": "ქრისტეშობა"
    },
    {
      "date": "2026-01-19",
      "name": "Epiphany (Orthodox)",
      "type": "public",
      "impact": "medium",
      "localName": "ნათლისღება"
    },
    {
      "date": "2026-03-03",
      "name": "Mother's Day",
      "type": "public",
      "impact": "medium",
      "localName": "დედის დღე"
    },
    {
      "date": "2026-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high",
      "localName": "ქალთა საერთაშორისო დღე"
    },
    {
      "date": "2026-04-09",
      "name": "National Unity Day",
      "type": "public",
      "impact": "high",
      "localName": "ეროვნული ერთიანობის დღე"
    },
    {
      "date": "2026-04-10",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "ძველი პარასკევი"
    },
    {
      "date": "2026-04-11",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium",
      "localName": "დიდი შაბათი"
    },
    {
      "date": "2026-04-12",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "აღდგომის კვირა"
    },
    {
      "date": "2026-04-13",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "აღდგომის ორშაბათი"
    },
    {
      "date": "2026-05-09",
      "name": "Day of Victory over Fascism",
      "type": "public",
      "impact": "high",
      "localName": "ფაშიზმზე გამარჯვების დღე"
    },
    {
      "date": "2026-05-12",
      "name": "Saint Andrew the First-Called Day",
      "type": "public",
      "impact": "medium",
      "localName": "წმინდა მოციქულის ანდრია პირველწოდებულის საქართველოში შემოსვლის დღე"
    },
    {
      "date": "2026-05-26",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "დამოუკიდებლობის დღე"
    },
    {
      "date": "2026-08-28",
      "name": "Saint Mary's Day",
      "type": "public",
      "impact": "medium",
      "localName": "მარიამობა"
    },
    {
      "date": "2026-10-14",
      "name": "Day of Svetitskhoveli Cathedra",
      "type": "public",
      "impact": "medium",
      "localName": "სვეტიცხოვლობა"
    },
    {
      "date": "2026-11-23",
      "name": "Saint George's Day",
      "type": "public",
      "impact": "medium",
      "localName": "გიორგობა"
    }
  ],
  "GF": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Jour de l'An"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Lundi de Pâques"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête du Travail"
    },
    {
      "date": "2026-05-08",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête de la Victoire 1945"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ascension"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Lundi de Pentecôte"
    },
    {
      "date": "2026-06-10",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium",
      "localName": "Abolition de l'Esclavage"
    },
    {
      "date": "2026-07-14",
      "name": "National Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête Nationale"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Assomption"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Toussaint"
    },
    {
      "date": "2026-11-11",
      "name": "Armistice Day",
      "type": "public",
      "impact": "medium",
      "localName": "Armistice de 1918"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Noël"
    }
  ],
  "GH": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-07",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-03-06",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "May Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-07-01",
      "name": "Republic Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-09-21",
      "name": "Founders Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-04",
      "name": "Farmers' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "GL": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Ukiortaaq"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Kunngit pingasut ulluat"
    },
    {
      "date": "2026-04-02",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Sisamanngortoq illernartoq"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Tallimanngorneq tannaartoq"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Poorskip ullua"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Poorskip-aappaa"
    },
    {
      "date": "2026-05-01",
      "name": "General Prayer Day",
      "type": "public",
      "impact": "medium",
      "localName": "Tussiarfik"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Qilaliarfik"
    },
    {
      "date": "2026-05-15",
      "name": "Bank closing day",
      "type": "public",
      "impact": "medium",
      "localName": "Atuanngiffik"
    },
    {
      "date": "2026-05-24",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Piinsi"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Piinsip-aappaa"
    },
    {
      "date": "2026-06-21",
      "name": "Ullortuneq",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Juulliaraq"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Juullip ullua"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Juullip-aappaa"
    },
    {
      "date": "2026-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high",
      "localName": "Ukiutoqaq"
    }
  ],
  "GP": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Jour de l'An"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Lundi de Pâques"
    },
    {
      "date": "2026-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête du Travail"
    },
    {
      "date": "2026-05-08",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête de la Victoire 1945"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ascension"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Lundi de Pentecôte"
    },
    {
      "date": "2026-05-27",
      "name": "Abolition Day",
      "type": "public",
      "impact": "medium",
      "localName": "Abolition de l'Esclavage"
    },
    {
      "date": "2026-07-14",
      "name": "National Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête Nationale"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Assomption"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Toussaint"
    },
    {
      "date": "2026-11-11",
      "name": "Armistice Day",
      "type": "public",
      "impact": "medium",
      "localName": "Armistice"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Noël"
    }
  ],
  "GR": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Πρωτοχρονιά"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Θεοφάνεια"
    },
    {
      "date": "2026-02-23",
      "name": "Clean Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Καθαρά Δευτέρα"
    },
    {
      "date": "2026-03-25",
      "name": "Annunciation",
      "type": "public",
      "impact": "medium",
      "localName": "Ευαγγελισμός της Θεοτόκου"
    },
    {
      "date": "2026-03-25",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Εικοστή Πέμπτη Μαρτίου"
    },
    {
      "date": "2026-04-10",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Μεγάλη Παρασκευή"
    },
    {
      "date": "2026-04-12",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Κυριακή του Πάσχα"
    },
    {
      "date": "2026-04-13",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Δευτέρα του Πάσχα"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Εργατική Πρωτομαγιά"
    },
    {
      "date": "2026-05-31",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Πεντηκοστή"
    },
    {
      "date": "2026-06-01",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Δευτέρα Πεντηκοστής"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Κοίμηση της Θεοτόκου"
    },
    {
      "date": "2026-10-28",
      "name": "Ochi Day",
      "type": "public",
      "impact": "medium",
      "localName": "Το Όχι"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Χριστούγεννα"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Σύναξις Υπεραγίας Θεοτόκου Μαρίας"
    }
  ],
  "GT": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-02",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-04",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-06-30",
      "name": "Army Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-09-15",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-10-20",
      "name": "Revolution Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high"
    }
  ],
  "GY": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-02-23",
      "name": "Republic Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-05",
      "name": "Arrival Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-26",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-07-06",
      "name": "Caricom Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-01",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "HK": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "元旦新年"
    },
    {
      "date": "2026-02-17",
      "name": "Lunar New Year",
      "type": "public",
      "impact": "high",
      "localName": "農曆年初一"
    },
    {
      "date": "2026-02-18",
      "name": "Second day of Lunar New Year",
      "type": "public",
      "impact": "high",
      "localName": "農曆年初二"
    },
    {
      "date": "2026-02-19",
      "name": "Third day of Lunar New Year",
      "type": "public",
      "impact": "high",
      "localName": "農曆年初三"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "耶穌受難節"
    },
    {
      "date": "2026-04-04",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium",
      "localName": "耶穌受難節翌日"
    },
    {
      "date": "2026-04-06",
      "name": "Ching Ming Festival",
      "type": "public",
      "impact": "medium",
      "localName": "清明節"
    },
    {
      "date": "2026-04-07",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "復活節星期一"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "勞動節"
    },
    {
      "date": "2026-05-25",
      "name": "Buddha's Birthday",
      "type": "public",
      "impact": "medium",
      "localName": "佛誕"
    },
    {
      "date": "2026-06-19",
      "name": "Dragon Boat Festival",
      "type": "public",
      "impact": "medium",
      "localName": "端午節"
    },
    {
      "date": "2026-07-01",
      "name": "Hong Kong Special Administrative Region Establishment Day",
      "type": "public",
      "impact": "medium",
      "localName": "香港特別行政區成立紀念日"
    },
    {
      "date": "2026-09-26",
      "name": "Day following the Mid-Autumn Festival",
      "type": "public",
      "impact": "medium",
      "localName": "中秋節翌日"
    },
    {
      "date": "2026-10-01",
      "name": "National Day",
      "type": "public",
      "impact": "high",
      "localName": "中華人民共和國國慶日"
    },
    {
      "date": "2026-10-19",
      "name": "Chung Yeung Festival",
      "type": "public",
      "impact": "medium",
      "localName": "重陽節"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "聖誕節"
    },
    {
      "date": "2026-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium",
      "localName": "聖誕節翌日"
    }
  ],
  "HN": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-02",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Holy Thursday"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-04",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-14",
      "name": "America's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-09-15",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-10-03",
      "name": "Francisco Morazán's Day/Soldier's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-10-12",
      "name": "Columbus Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-10-21",
      "name": "Army Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "HR": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nova Godina"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Bogojavljenje, Sveta tri kralja"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Uskrs i uskrsni ponedjeljak"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Uskrs i uskrsni ponedjeljak"
    },
    {
      "date": "2026-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "Međunarodni praznik rada"
    },
    {
      "date": "2026-05-30",
      "name": "National Day",
      "type": "public",
      "impact": "high",
      "localName": "Dan državnosti"
    },
    {
      "date": "2026-06-04",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium",
      "localName": "Tijelovo"
    },
    {
      "date": "2026-06-22",
      "name": "Anti-Fascist Struggle Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dan antifašističke borbe"
    },
    {
      "date": "2026-08-05",
      "name": "Victory and Homeland Thanksgiving Day and the Day of Croatian defenders",
      "type": "public",
      "impact": "high",
      "localName": "Dan pobjede i domovinske zahvalnosti i Dan hrvatskih branitelja"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Velika Gospa"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dan svih svetih"
    },
    {
      "date": "2026-11-18",
      "name": "Remembrance Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dan sjećanja na žrtve Domovinskog rata"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Božić"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Prvi dan po Božiću, Sveti Stjepan, Štefanje, Stipanje"
    }
  ],
  "HT": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Jour de l'an"
    },
    {
      "date": "2026-01-02",
      "name": "Ancestry Day",
      "type": "public",
      "impact": "medium",
      "localName": "Jour des Aieux"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Le Jour des Rois"
    },
    {
      "date": "2026-02-16",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2026-02-17",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2026-02-18",
      "name": "Ash Wednesday",
      "type": "public",
      "impact": "medium",
      "localName": "Mercredi Des Cendres"
    },
    {
      "date": "2026-04-02",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Jeudi saint"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Vendredi saint"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Pâques"
    },
    {
      "date": "2026-05-01",
      "name": "Labour and Agriculture Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête du Travail / Fête des Travailleurs"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ascension"
    },
    {
      "date": "2026-05-18",
      "name": "Flag and Universities Day",
      "type": "public",
      "impact": "medium",
      "localName": "Jour du Drapeau et de l'Université"
    },
    {
      "date": "2026-06-04",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium",
      "localName": "Fête-Dieu"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption of Mary",
      "type": "public",
      "impact": "medium",
      "localName": "L'Assomption de Marie"
    },
    {
      "date": "2026-10-17",
      "name": "Dessalines Day",
      "type": "public",
      "impact": "medium",
      "localName": "Anniversaire de la mort de Dessalines"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints Day",
      "type": "public",
      "impact": "medium",
      "localName": "La Toussaint"
    },
    {
      "date": "2026-11-02",
      "name": "All Souls' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Jour des Morts"
    },
    {
      "date": "2026-11-18",
      "name": "Battle of Vertières Day",
      "type": "public",
      "impact": "medium",
      "localName": "Vertières"
    },
    {
      "date": "2026-12-05",
      "name": "Discovery Day",
      "type": "public",
      "impact": "medium",
      "localName": "Découverte d'Haïti"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Noël"
    }
  ],
  "HU": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Újév"
    },
    {
      "date": "2026-03-15",
      "name": "1848 Revolution Memorial Day",
      "type": "public",
      "impact": "medium",
      "localName": "Nemzeti ünnep"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Nagypéntek"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Húsvétvasárnap"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Húsvéthétfő"
    },
    {
      "date": "2026-05-01",
      "name": "Labour day",
      "type": "public",
      "impact": "high",
      "localName": "A munka ünnepe"
    },
    {
      "date": "2026-05-24",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Pünkösdvasárnap"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Pünkösdhétfő"
    },
    {
      "date": "2026-08-20",
      "name": "State Foundation Day",
      "type": "public",
      "impact": "medium",
      "localName": "Az államalapítás ünnepe"
    },
    {
      "date": "2026-10-23",
      "name": "1956 Revolution Memorial Day",
      "type": "public",
      "impact": "medium",
      "localName": "Nemzeti ünnep"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints Day",
      "type": "public",
      "impact": "medium",
      "localName": "Mindenszentek"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Karácsony"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Karácsony másnapja"
    }
  ],
  "ID": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Tahun Baru Masehi"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Wafat Isa Almasih"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Paskah"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Hari Buruh Internasional"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Kenaikan Isa Almasih"
    },
    {
      "date": "2026-06-01",
      "name": "Pancasila Day",
      "type": "public",
      "impact": "medium",
      "localName": "Hari Lahir Pancasila"
    },
    {
      "date": "2026-08-17",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Hari Ulang Tahun Kemerdekaan Republik Indonesia"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Hari Raya Natal"
    }
  ],
  "IE": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Lá Caille"
    },
    {
      "date": "2026-02-02",
      "name": "Saint Brigid's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Lá Fhéile Bríde"
    },
    {
      "date": "2026-03-17",
      "name": "Saint Patrick's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Lá Fhéile Pádraig"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Aoine an Chéasta"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Luan Cásca"
    },
    {
      "date": "2026-05-04",
      "name": "May Day",
      "type": "public",
      "impact": "medium",
      "localName": "Lá Bealtaine"
    },
    {
      "date": "2026-06-01",
      "name": "June Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Lá Saoire i mí an Mheithimh"
    },
    {
      "date": "2026-08-03",
      "name": "August Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Lá Saoire i mí Lúnasa"
    },
    {
      "date": "2026-10-26",
      "name": "October Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Lá Saoire i mí Dheireadh Fómhair"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Lá Nollag"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Lá Fhéile Stiofáin"
    }
  ],
  "IS": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nýársdagur"
    },
    {
      "date": "2026-04-02",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Skírdagur"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Föstudagurinn langi"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Páskadagur"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Annar í páskum"
    },
    {
      "date": "2026-04-23",
      "name": "First Day of Summer",
      "type": "public",
      "impact": "medium",
      "localName": "Sumardagurinn fyrsti"
    },
    {
      "date": "2026-05-01",
      "name": "May Day",
      "type": "public",
      "impact": "medium",
      "localName": "Verkalýðsdagurinn"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Uppstigningardagur"
    },
    {
      "date": "2026-05-24",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Hvítasunnudagur"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Annar í hvítasunnu"
    },
    {
      "date": "2026-06-17",
      "name": "Icelandic National Day",
      "type": "public",
      "impact": "high",
      "localName": "Þjóðhátíðardagurinn"
    },
    {
      "date": "2026-08-03",
      "name": "Commerce Day",
      "type": "public",
      "impact": "high",
      "localName": "Frídagur verslunarmanna"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Aðfangadagur"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Jóladagur"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Annar í jólum"
    },
    {
      "date": "2026-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high",
      "localName": "Gamlársdagur"
    }
  ],
  "IT": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Capodanno"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Epifania"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Pasqua"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Lunedì dell'Angelo"
    },
    {
      "date": "2026-04-25",
      "name": "Liberation Day",
      "type": "public",
      "impact": "high",
      "localName": "Festa della Liberazione"
    },
    {
      "date": "2026-05-01",
      "name": "International Workers Day",
      "type": "public",
      "impact": "high",
      "localName": "Festa del Lavoro"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "regional",
      "impact": "medium",
      "localName": "Lunedì di Pentecoste",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-06-02",
      "name": "Republic Day",
      "type": "public",
      "impact": "high",
      "localName": "Festa della Repubblica"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ferragosto o Assunzione"
    },
    {
      "date": "2026-10-04",
      "name": "St. Francis of Assisi's Day",
      "type": "public",
      "impact": "medium",
      "localName": "San Francesco d'Assisi"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints Day",
      "type": "public",
      "impact": "medium",
      "localName": "Tutti i Santi"
    },
    {
      "date": "2026-12-08",
      "name": "Immaculate Conception",
      "type": "public",
      "impact": "medium",
      "localName": "Immacolata Concezione"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Natale"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Santo Stefano"
    }
  ],
  "JM": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-02-18",
      "name": "Ash Wednesday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-23",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-08-01",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-06",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-10-16",
      "name": "National Heroes Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "JP": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "元日"
    },
    {
      "date": "2026-01-12",
      "name": "Coming of Age Day",
      "type": "public",
      "impact": "medium",
      "localName": "成人の日"
    },
    {
      "date": "2026-02-11",
      "name": "Foundation Day",
      "type": "public",
      "impact": "medium",
      "localName": "建国記念の日"
    },
    {
      "date": "2026-02-23",
      "name": "The Emperor's Birthday",
      "type": "public",
      "impact": "medium",
      "localName": "天皇誕生日"
    },
    {
      "date": "2026-03-20",
      "name": "Vernal Equinox Day",
      "type": "public",
      "impact": "medium",
      "localName": "春分の日"
    },
    {
      "date": "2026-04-29",
      "name": "Shōwa Day",
      "type": "public",
      "impact": "medium",
      "localName": "昭和の日"
    },
    {
      "date": "2026-05-04",
      "name": "Greenery Day",
      "type": "public",
      "impact": "medium",
      "localName": "みどりの日"
    },
    {
      "date": "2026-05-05",
      "name": "Children's Day",
      "type": "public",
      "impact": "medium",
      "localName": "こどもの日"
    },
    {
      "date": "2026-05-06",
      "name": "Constitution Memorial Day",
      "type": "public",
      "impact": "high",
      "localName": "憲法記念日"
    },
    {
      "date": "2026-07-20",
      "name": "Marine Day",
      "type": "public",
      "impact": "medium",
      "localName": "海の日"
    },
    {
      "date": "2026-08-11",
      "name": "Mountain Day",
      "type": "public",
      "impact": "medium",
      "localName": "山の日"
    },
    {
      "date": "2026-09-21",
      "name": "Respect for the Aged Day",
      "type": "public",
      "impact": "medium",
      "localName": "敬老の日"
    },
    {
      "date": "2026-09-23",
      "name": "Autumnal Equinox Day",
      "type": "public",
      "impact": "medium",
      "localName": "秋分の日"
    },
    {
      "date": "2026-10-12",
      "name": "Sports Day",
      "type": "public",
      "impact": "medium",
      "localName": "スポーツの日"
    },
    {
      "date": "2026-11-03",
      "name": "Culture Day",
      "type": "public",
      "impact": "medium",
      "localName": "文化の日"
    },
    {
      "date": "2026-11-23",
      "name": "Labour Thanksgiving Day",
      "type": "public",
      "impact": "high",
      "localName": "勤労感謝の日"
    }
  ],
  "KE": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-06-01",
      "name": "Madaraka Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-10-10",
      "name": "Mazingira Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-10-20",
      "name": "Mashujaa Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-12",
      "name": "Jamhuri Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "KH": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "ទិវាបុណ្យចូលឆ្នាំសកល"
    },
    {
      "date": "2026-01-07",
      "name": "Victory over Genocide Day",
      "type": "public",
      "impact": "high",
      "localName": "ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍"
    },
    {
      "date": "2026-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high",
      "localName": "ទិវានារីអន្តរជាតិ"
    },
    {
      "date": "2026-04-14",
      "name": "Khmer New Year",
      "type": "public",
      "impact": "high",
      "localName": "ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ"
    },
    {
      "date": "2026-04-15",
      "name": "Khmer New Year",
      "type": "public",
      "impact": "high",
      "localName": "ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ"
    },
    {
      "date": "2026-04-16",
      "name": "Khmer New Year",
      "type": "public",
      "impact": "high",
      "localName": "ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "ទិវាពលកម្មអន្តរជាតិ"
    },
    {
      "date": "2026-05-05",
      "name": "Royal Ploughing Ceremony",
      "type": "public",
      "impact": "medium",
      "localName": "ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល"
    },
    {
      "date": "2026-05-14",
      "name": "King Sihamoni's Birthday",
      "type": "public",
      "impact": "medium",
      "localName": "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម ព្រះករុណា នរោត្តម សីហមុនី"
    },
    {
      "date": "2026-06-18",
      "name": "Queen Mother's Birthday",
      "type": "public",
      "impact": "medium",
      "localName": "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម សម្តេចព្រះមហាក្សត្រី នរោត្តម មុនិនាថ សីហនុ"
    },
    {
      "date": "2026-09-24",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "ទិវាប្រកាសរដ្ឋធម្មនុញ្ញ"
    },
    {
      "date": "2026-10-10",
      "name": "Pchum Ben",
      "type": "public",
      "impact": "medium",
      "localName": "ពិធីបុណ្យភ្ផុំបិណ្ឌ"
    },
    {
      "date": "2026-10-11",
      "name": "Pchum Ben",
      "type": "public",
      "impact": "medium",
      "localName": "ពិធីបុណ្យភ្ផុំបិណ្ឌ"
    },
    {
      "date": "2026-10-12",
      "name": "Pchum Ben",
      "type": "public",
      "impact": "medium",
      "localName": "ពិធីបុណ្យភ្ផុំបិណ្ឌ"
    },
    {
      "date": "2026-10-15",
      "name": "Commemoration Day of the King's Father",
      "type": "public",
      "impact": "medium",
      "localName": "ព្រះរាជពិធីគោរពព្រះវិញ្ញាណក្ខន្ធព្រះករុណាព្រះបាទសម្ដេចព្រះ នរោត្ដម សីហនុ"
    },
    {
      "date": "2026-10-29",
      "name": "Coronation Day of King Sihamoni",
      "type": "public",
      "impact": "medium",
      "localName": "ព្រះរាជពិធីគ្រងព្រះបរមរាជសម្បត្តិរបស់ព្រះករុណាព្រះបាទសម្ដេចព្រះបរមនាថ នរោត្ដម សីហមុនី"
    },
    {
      "date": "2026-11-09",
      "name": "National Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "ទិវាបុណ្យឯករាជ្យជាតិ"
    },
    {
      "date": "2026-11-23",
      "name": "Water Festival",
      "type": "public",
      "impact": "medium",
      "localName": "ពិធីបុណ្យអុំទូក បណ្ដែតប្រទីប អកអំបុក និងសំពះព្រះខែ"
    },
    {
      "date": "2026-11-24",
      "name": "Water Festival",
      "type": "public",
      "impact": "medium",
      "localName": "ពិធីបុណ្យអុំទូក បណ្ដែតប្រទីប អកអំបុក និងសំពះព្រះខែ"
    },
    {
      "date": "2026-11-25",
      "name": "Water Festival",
      "type": "public",
      "impact": "medium",
      "localName": "ពិធីបុណ្យអុំទូក បណ្ដែតប្រទីប អកអំបុក និងសំពះព្រះខែ"
    },
    {
      "date": "2026-12-29",
      "name": "Cambodia Peace Day",
      "type": "public",
      "impact": "medium",
      "localName": "ទិវាសន្តិភាពនៅកម្ពុជា"
    }
  ],
  "KN": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-02",
      "name": "Carnival Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-01-28",
      "name": "Buckley's Uprising Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-04",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-03",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-04",
      "name": "Culturama Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-09-16",
      "name": "National Heroes' Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-09-19",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "KR": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "새해"
    },
    {
      "date": "2026-02-16",
      "name": "Lunar New Year",
      "type": "public",
      "impact": "high",
      "localName": "설날"
    },
    {
      "date": "2026-02-17",
      "name": "Lunar New Year",
      "type": "public",
      "impact": "high",
      "localName": "설날"
    },
    {
      "date": "2026-02-18",
      "name": "Lunar New Year",
      "type": "public",
      "impact": "high",
      "localName": "설날"
    },
    {
      "date": "2026-03-02",
      "name": "Independence Movement Day",
      "type": "public",
      "impact": "high",
      "localName": "3·1절"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "노동절"
    },
    {
      "date": "2026-05-05",
      "name": "Children's Day",
      "type": "public",
      "impact": "medium",
      "localName": "어린이날"
    },
    {
      "date": "2026-05-25",
      "name": "Buddha's Birthday",
      "type": "public",
      "impact": "medium",
      "localName": "부처님 오신 날"
    },
    {
      "date": "2026-06-03",
      "name": "Local Election Day",
      "type": "public",
      "impact": "medium",
      "localName": "지방 선거일"
    },
    {
      "date": "2026-06-06",
      "name": "Memorial Day",
      "type": "public",
      "impact": "medium",
      "localName": "현충일"
    },
    {
      "date": "2026-07-17",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "제헌절"
    },
    {
      "date": "2026-08-17",
      "name": "Liberation Day",
      "type": "public",
      "impact": "high",
      "localName": "광복절"
    },
    {
      "date": "2026-09-24",
      "name": "Chuseok",
      "type": "public",
      "impact": "medium",
      "localName": "추석"
    },
    {
      "date": "2026-09-25",
      "name": "Chuseok",
      "type": "public",
      "impact": "medium",
      "localName": "추석"
    },
    {
      "date": "2026-09-26",
      "name": "Chuseok",
      "type": "public",
      "impact": "medium",
      "localName": "추석"
    },
    {
      "date": "2026-10-05",
      "name": "National Foundation Day",
      "type": "public",
      "impact": "high",
      "localName": "개천절"
    },
    {
      "date": "2026-10-09",
      "name": "Hangul Day",
      "type": "public",
      "impact": "medium",
      "localName": "한글날"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "크리스마스"
    }
  ],
  "KY": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-26",
      "name": "National Heroes Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-02-18",
      "name": "Ash Wednesday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-04",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-18",
      "name": "Discovery Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-07-06",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-11-09",
      "name": "Remembrance Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "KZ": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Жаңа жыл"
    },
    {
      "date": "2026-01-02",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Жаңа жыл"
    },
    {
      "date": "2026-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high",
      "localName": "Халықаралық әйелдер күні"
    },
    {
      "date": "2026-03-21",
      "name": "Nauryz Meyramy",
      "type": "public",
      "impact": "medium",
      "localName": "Наурыз мейрамы"
    },
    {
      "date": "2026-03-22",
      "name": "Nauryz Meyramy",
      "type": "public",
      "impact": "medium",
      "localName": "Наурыз мейрамы"
    },
    {
      "date": "2026-03-23",
      "name": "Nauryz Meyramy",
      "type": "public",
      "impact": "medium",
      "localName": "Наурыз мейрамы"
    },
    {
      "date": "2026-05-01",
      "name": "Kazakhstan People's Unity Day",
      "type": "public",
      "impact": "medium",
      "localName": "Қазақстан халқының"
    },
    {
      "date": "2026-05-07",
      "name": "Defender of the Fatherland Day",
      "type": "public",
      "impact": "medium",
      "localName": "Отан Қорғаушы күні"
    },
    {
      "date": "2026-05-09",
      "name": "Great Patriotic War Against Fascism Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Жеңіс күні"
    },
    {
      "date": "2026-07-06",
      "name": "Capital City Day",
      "type": "public",
      "impact": "medium",
      "localName": "Астана күні"
    },
    {
      "date": "2026-08-30",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Конституция күні"
    },
    {
      "date": "2026-10-25",
      "name": "Republic Day",
      "type": "public",
      "impact": "high",
      "localName": "Республика күні"
    },
    {
      "date": "2026-12-16",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Тәуелсіздік күні"
    }
  ],
  "LC": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-02-22",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "May Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-04",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-01",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-10-05",
      "name": "Thanksgiving",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-13",
      "name": "National day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "LT": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Naujieji metai"
    },
    {
      "date": "2026-02-16",
      "name": "The Day of Restoration of the State of Lithuania",
      "type": "public",
      "impact": "medium",
      "localName": "Lietuvos valstybės atkūrimo diena"
    },
    {
      "date": "2026-03-11",
      "name": "Day of Restoration of Independence of Lithuania",
      "type": "public",
      "impact": "high",
      "localName": "Lietuvos nepriklausomybės atkūrimo diena"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Velykos"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Antroji Velykų diena"
    },
    {
      "date": "2026-05-01",
      "name": "International Working Day",
      "type": "public",
      "impact": "high",
      "localName": "Tarptautinė darbo diena"
    },
    {
      "date": "2026-06-24",
      "name": "St. John's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Joninės, Rasos"
    },
    {
      "date": "2026-07-06",
      "name": "Statehood Day",
      "type": "public",
      "impact": "medium",
      "localName": "Valstybės diena"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Žolinė"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Visų šventųjų diena"
    },
    {
      "date": "2026-11-02",
      "name": "All Souls' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Vėlinės"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Šv. Kūčios"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Šv. Kalėdos"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Šv. Kalėdos"
    }
  ],
  "LU": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Neijoerschdag"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Karfreideg"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Ouschterméindeg"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Dag vun der Aarbecht"
    },
    {
      "date": "2026-05-09",
      "name": "Europe Day",
      "type": "public",
      "impact": "medium",
      "localName": "Europadag"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Christi Himmelfaart"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Péngschtméindeg"
    },
    {
      "date": "2026-06-23",
      "name": "Sovereign's birthday",
      "type": "public",
      "impact": "medium",
      "localName": "Groussherzogsgebuertsdag"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Léiffrawëschdag"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Allerhellgen"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Chrëschtdag"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Stiefesdag"
    }
  ],
  "LV": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Jaungada diena"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Lielā Piektdiena"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Pirmās Lieldienas"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Otrās Lieldienas"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Darba svētki"
    },
    {
      "date": "2026-05-01",
      "name": "Day of the Convocation of the Constitutional Assembly of the Republic of Latvia",
      "type": "public",
      "impact": "high",
      "localName": "Latvijas Republikas Satversmes sapulces sasaukšanas diena"
    },
    {
      "date": "2026-05-04",
      "name": "Day of the Restoration of Independence of the Republic of Latvia",
      "type": "public",
      "impact": "high",
      "localName": "Latvijas Republikas Neatkarības atjaunošanas diena"
    },
    {
      "date": "2026-05-10",
      "name": "Mother's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Mātes diena"
    },
    {
      "date": "2026-05-24",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Vasarsvētki"
    },
    {
      "date": "2026-06-23",
      "name": "Līgo Day",
      "type": "public",
      "impact": "medium",
      "localName": "Līgo diena"
    },
    {
      "date": "2026-06-24",
      "name": "Jāņi Day",
      "type": "public",
      "impact": "medium",
      "localName": "Jāņu diena"
    },
    {
      "date": "2026-11-18",
      "name": "Day of the Proclamation of the Republic of Latvia",
      "type": "public",
      "impact": "high",
      "localName": "Latvijas Republikas Proklamēšanas diena"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Ziemassvētku vakars"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Pirmie Ziemassvētki"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Otrie Ziemassvētki"
    },
    {
      "date": "2026-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high",
      "localName": "Vecgada diena"
    }
  ],
  "MA": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Ras l' âm"
    },
    {
      "date": "2026-01-11",
      "name": "Proclamation of Independence",
      "type": "public",
      "impact": "high",
      "localName": "Takdim watikat al-istiqlal"
    },
    {
      "date": "2026-01-14",
      "name": "Amazigh New Year",
      "type": "public",
      "impact": "high",
      "localName": "Id Yennayer"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Eid Ash-Shughl"
    },
    {
      "date": "2026-07-30",
      "name": "Enthronement",
      "type": "public",
      "impact": "high",
      "localName": "Eid Al-Ârch"
    },
    {
      "date": "2026-08-14",
      "name": "Zikra Oued Ed-Dahab",
      "type": "public",
      "impact": "medium",
      "localName": "Oued Ed-Dahab Day"
    },
    {
      "date": "2026-08-20",
      "name": "Revolution of the King and the People",
      "type": "public",
      "impact": "medium",
      "localName": "Thawrat al malik wa shâab"
    },
    {
      "date": "2026-08-21",
      "name": "Youth Day",
      "type": "public",
      "impact": "high",
      "localName": "Eid Al Chabab"
    },
    {
      "date": "2026-11-06",
      "name": "Green March",
      "type": "public",
      "impact": "high",
      "localName": "Eid Al Massira Al Khadra"
    },
    {
      "date": "2026-11-18",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Eid Al Istiqulal"
    }
  ],
  "MG": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-03-29",
      "name": "Martyrs' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-26",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "MN": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Шинэ жил (Shine jil)"
    },
    {
      "date": "2026-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high",
      "localName": "Олон Улсын Эмэгтэйчүүдийн Баяр"
    },
    {
      "date": "2026-06-01",
      "name": "Naadam Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Наадам"
    },
    {
      "date": "2026-07-11",
      "name": "Naadam Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Наадам"
    },
    {
      "date": "2026-07-12",
      "name": "Naadam Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Наадам"
    },
    {
      "date": "2026-07-13",
      "name": "Naadam Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Наадам"
    },
    {
      "date": "2026-07-14",
      "name": "Naadam Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Наадам"
    },
    {
      "date": "2026-07-15",
      "name": "Naadam Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Наадам"
    },
    {
      "date": "2026-11-26",
      "name": "Republic Day",
      "type": "public",
      "impact": "high",
      "localName": "Улс тунхагласны өдөр"
    },
    {
      "date": "2026-12-29",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Тусгаар Тогтнолын Өдөр"
    }
  ],
  "MQ": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Jour de l'An"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Lundi de Pâques"
    },
    {
      "date": "2026-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête du Travail"
    },
    {
      "date": "2026-05-08",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête de la Victoire 1945"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ascension"
    },
    {
      "date": "2026-05-22",
      "name": "Abolition Day",
      "type": "public",
      "impact": "medium",
      "localName": "Abolition de l'Esclavage"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Lundi de Pentecôte"
    },
    {
      "date": "2026-07-14",
      "name": "National Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête Nationale"
    },
    {
      "date": "2026-07-21",
      "name": "Schoelcher Day",
      "type": "public",
      "impact": "medium",
      "localName": "Fête Victor Schœlcher"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Assomption"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Toussaint"
    },
    {
      "date": "2026-11-11",
      "name": "Armistice Day",
      "type": "public",
      "impact": "medium",
      "localName": "Armistice"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Noël"
    }
  ],
  "MT": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "L-Ewwel tas-Sena"
    },
    {
      "date": "2026-02-10",
      "name": "Feast of St. Paul's Shipwreck",
      "type": "public",
      "impact": "medium",
      "localName": "In-Nawfraġju ta’ San Pawl"
    },
    {
      "date": "2026-03-19",
      "name": "Feast of St. Joseph",
      "type": "public",
      "impact": "medium",
      "localName": "San Ġużepp"
    },
    {
      "date": "2026-03-31",
      "name": "Freedom Day",
      "type": "public",
      "impact": "medium",
      "localName": "Jum il-Ħelsien"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Il-Ġimgħa l-Kbira"
    },
    {
      "date": "2026-05-01",
      "name": "Worker's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Jum il-Ħaddiem"
    },
    {
      "date": "2026-06-07",
      "name": "Sette Giugno",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-29",
      "name": "Feast of St.Peter and St.Paul",
      "type": "public",
      "impact": "medium",
      "localName": "L-Imnarja"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Santa Marija"
    },
    {
      "date": "2026-09-08",
      "name": "Feast of Our Lady of Victories",
      "type": "public",
      "impact": "medium",
      "localName": "Il-Vittorja"
    },
    {
      "date": "2026-09-21",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "L-Indipendenza"
    },
    {
      "date": "2026-12-08",
      "name": "Feast of the Immaculate Conception",
      "type": "public",
      "impact": "medium",
      "localName": "L-Immakulata Kunċizzjoni"
    },
    {
      "date": "2026-12-13",
      "name": "Republic Day",
      "type": "public",
      "impact": "high",
      "localName": "Jum ir-Repubblika"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Il-Milied"
    }
  ],
  "MX": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2026-02-02",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Constitución"
    },
    {
      "date": "2026-03-16",
      "name": "Benito Juárez's birthday",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio de Benito Juárez"
    },
    {
      "date": "2026-04-02",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Jueves Santo"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día del Trabajo"
    },
    {
      "date": "2026-09-16",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia"
    },
    {
      "date": "2026-11-16",
      "name": "Revolution Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Revolución"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "MZ": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia de Ano Novo"
    },
    {
      "date": "2026-02-03",
      "name": "Heroes's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia do Heroi Nacional"
    },
    {
      "date": "2026-04-07",
      "name": "Women's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia da Mulher"
    },
    {
      "date": "2026-05-01",
      "name": "Worker's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia do Trabalhador"
    },
    {
      "date": "2026-06-25",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia da Independência"
    },
    {
      "date": "2026-09-07",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia da Victória"
    },
    {
      "date": "2026-09-25",
      "name": "Revolution Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia da Revolução"
    },
    {
      "date": "2026-10-04",
      "name": "Day of Peace and Reconciliation",
      "type": "public",
      "impact": "medium",
      "localName": "Dia da Paz e da Reconcialição"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Natal"
    }
  ],
  "NA": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-03-21",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Workers' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-04",
      "name": "Cassinga Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-25",
      "name": "Africa Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-28",
      "name": "Genocide Remembrance Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-26",
      "name": "Heroes' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-10",
      "name": "Human Rights Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "Day of Goodwill",
      "type": "public",
      "impact": "medium",
      "localName": "St. Stephen's Day"
    }
  ],
  "NE": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-24",
      "name": "Concord Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-08-03",
      "name": "Nigerien Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-18",
      "name": "Nigerien Republic Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "NG": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Workers' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-27",
      "name": "Children's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-12",
      "name": "Democracy Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-10-01",
      "name": "National Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-11-01",
      "name": "National Youth Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-28",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "NI": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-02-01",
      "name": "Air Force Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-02",
      "name": "Holy Thursday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-27",
      "name": "Army Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-07-19",
      "name": "Liberation Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-09-14",
      "name": "Battle of San Jacinto",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-09-15",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-10-12",
      "name": "Indigenous Resistance Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-08",
      "name": "Immaculate Conception",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high"
    }
  ],
  "NL": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nieuwjaarsdag"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Goede Vrijdag"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Eerste Paasdag"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Tweede Paasdag"
    },
    {
      "date": "2026-04-27",
      "name": "King's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Koningsdag"
    },
    {
      "date": "2026-05-05",
      "name": "Liberation Day",
      "type": "public",
      "impact": "high",
      "localName": "Bevrijdingsdag"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Hemelvaartsdag"
    },
    {
      "date": "2026-05-24",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Eerste Pinksterdag"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Tweede Pinksterdag"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Eerste Kerstdag"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Tweede Kerstdag"
    }
  ],
  "NO": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Første nyttårsdag"
    },
    {
      "date": "2026-04-02",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Skjærtorsdag"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Langfredag"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Første påskedag"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Andre påskedag"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Første mai"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Kristi himmelfartsdag"
    },
    {
      "date": "2026-05-17",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Syttende mai"
    },
    {
      "date": "2026-05-24",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Første pinsedag"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Andre pinsedag"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Første juledag"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Andre juledag"
    }
  ],
  "NZ": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-02",
      "name": "Day after New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-19",
      "name": "Wellington Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-01-26",
      "name": "Auckland Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Auckland/Northland Anniversary Day",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-02-02",
      "name": "Nelson Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-02-06",
      "name": "Waitangi Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-03-09",
      "name": "Taranaki Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-03-23",
      "name": "Otago Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-07",
      "name": "Southland Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-04-27",
      "name": "Anzac Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-01",
      "name": "King's Birthday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-07-10",
      "name": "Matariki",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-09-28",
      "name": "Canterbury (South) Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Dominion Day",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-10-23",
      "name": "Hawke's Bay Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-10-26",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-11-02",
      "name": "Marlborough Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-11-13",
      "name": "Canterbury Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Canterbury (North & Central) Anniversary Day",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-11-30",
      "name": "Chatham Islands Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-11-30",
      "name": "Westland Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-28",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "PA": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-09",
      "name": "Martyr's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-02-16",
      "name": "Carnival",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-02-17",
      "name": "Carnival",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-11-03",
      "name": "Separation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-11-04",
      "name": "Flag Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-11-05",
      "name": "Colon Day",
      "type": "public",
      "impact": "medium",
      "localName": "Colón Day"
    },
    {
      "date": "2026-11-10",
      "name": "Shout in Villa de los Santos",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-11-28",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-08",
      "name": "Mother's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "PE": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2026-04-02",
      "name": "Holy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Jueves Santo"
    },
    {
      "date": "2026-04-02",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Jueves Santo"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Domingo Santo"
    },
    {
      "date": "2026-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "Día del Trabajo"
    },
    {
      "date": "2026-06-29",
      "name": "Saint Peter and Saint Paul",
      "type": "public",
      "impact": "medium",
      "localName": "Día de San Pedro y San Pablo"
    },
    {
      "date": "2026-07-28",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia"
    },
    {
      "date": "2026-07-29",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia"
    },
    {
      "date": "2026-08-30",
      "name": "Santa Rosa de Lima",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Santa Rosa de Lima"
    },
    {
      "date": "2026-10-08",
      "name": "Battle of Angamos",
      "type": "public",
      "impact": "medium",
      "localName": "Combate de Angamos"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Todos los Santos"
    },
    {
      "date": "2026-12-08",
      "name": "Immaculate Conception",
      "type": "public",
      "impact": "medium",
      "localName": "Inmaculada Concepción"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "PG": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-04",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-06-08",
      "name": "Queen's Birthday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-07-23",
      "name": "Remembrance Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-26",
      "name": "Repentance Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-09-16",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium",
      "localName": "St. Stephen's Day"
    }
  ],
  "PH": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Bagong Taon"
    },
    {
      "date": "2026-02-17",
      "name": "Chinese New Year",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-02",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Huwebes Santo"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Biyernes Santo"
    },
    {
      "date": "2026-04-04",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium",
      "localName": "Sabado de Gloria"
    },
    {
      "date": "2026-04-09",
      "name": "Day of Valor",
      "type": "public",
      "impact": "medium",
      "localName": "Araw ng Kagitingan"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Araw ng Paggawa"
    },
    {
      "date": "2026-06-12",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Araw ng Kalayaan"
    },
    {
      "date": "2026-08-21",
      "name": "Ninoy Aquino Day",
      "type": "public",
      "impact": "medium",
      "localName": "Araw ng Kamatayan ni Senador Benigno Simeon \"Ninoy\" Aquino Jr."
    },
    {
      "date": "2026-08-31",
      "name": "National Heroes Day",
      "type": "public",
      "impact": "high",
      "localName": "Araw ng mga Bayani"
    },
    {
      "date": "2026-10-31",
      "name": "All Saints' Day Eve",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Araw ng mga Santo"
    },
    {
      "date": "2026-11-30",
      "name": "Bonifacio Day",
      "type": "public",
      "impact": "medium",
      "localName": "Araw ni Gat Andres Bonifacio"
    },
    {
      "date": "2026-12-08",
      "name": "Feast of the Immaculate Conception of Mary",
      "type": "public",
      "impact": "medium",
      "localName": "Kapistahan ng Immaculada Concepcion"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Araw ng Pasko"
    },
    {
      "date": "2026-12-30",
      "name": "Rizal Day",
      "type": "public",
      "impact": "medium",
      "localName": "Araw ng Kamatayan ni Dr. Jose Rizal"
    },
    {
      "date": "2026-12-31",
      "name": "Last Day of The Year",
      "type": "public",
      "impact": "medium",
      "localName": "Huling Araw ng Taon"
    }
  ],
  "PL": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nowy Rok"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Święto Trzech Króli"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Wielkanoc"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Drugi Dzień Wielkanocy"
    },
    {
      "date": "2026-05-01",
      "name": "May Day",
      "type": "public",
      "impact": "medium",
      "localName": "Święto Pracy"
    },
    {
      "date": "2026-05-03",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Święto Konstytucji 3 Maja"
    },
    {
      "date": "2026-05-24",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Zielone Świątki"
    },
    {
      "date": "2026-06-04",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium",
      "localName": "Boże Ciało"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Wniebowzięcie Najświętszej Maryi Panny"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Wszystkich Świętych"
    },
    {
      "date": "2026-11-11",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Narodowe Święto Niepodległości"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Wigilia Bożego Narodzenia"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Boże Narodzenie"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Drugi Dzień Bożego Narodzenia"
    }
  ],
  "PM": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Jour de l'An"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Lundi de Pâques"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête du Travail"
    },
    {
      "date": "2026-05-08",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête de la Victoire 1945"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ascension"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Lundi de Pentecôte"
    },
    {
      "date": "2026-07-14",
      "name": "National Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Assomption"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Toussaint"
    },
    {
      "date": "2026-11-11",
      "name": "Armistice Day",
      "type": "public",
      "impact": "medium",
      "localName": "Armistice"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Noël"
    }
  ],
  "PR": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de Año Nuevo"
    },
    {
      "date": "2026-01-06",
      "name": "Three Kings Day / Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Reyes"
    },
    {
      "date": "2026-01-12",
      "name": "Birthday of Eugenio María de Hostos",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio de Eugenio María de Hostos"
    },
    {
      "date": "2026-01-19",
      "name": "Martin Luther King, Jr. Day",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio de Martin Luther King, Jr."
    },
    {
      "date": "2026-02-16",
      "name": "Presidents' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de los Presidentes"
    },
    {
      "date": "2026-02-18",
      "name": "Birthday of Luis Muñoz Marín",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio de Luis Muñoz Marín"
    },
    {
      "date": "2026-03-22",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Abolición de Esclavitud"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2026-04-20",
      "name": "Birthday of José de Diego",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio de José de Diego"
    },
    {
      "date": "2026-05-25",
      "name": "Memorial Day",
      "type": "public",
      "impact": "medium",
      "localName": "Recordación de los Muertos de la Guerra"
    },
    {
      "date": "2026-07-03",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia de los Estados Unidos"
    },
    {
      "date": "2026-07-20",
      "name": "Birthday of Don Luis Muñoz Rivera",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio de Don Luis Muñoz Rivera"
    },
    {
      "date": "2026-07-25",
      "name": "Puerto Rico Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Constitución de Puerto Rico"
    },
    {
      "date": "2026-07-27",
      "name": "Birthday of Dr. José Celso Barbosa",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio de Dr. José Celso Barbosa"
    },
    {
      "date": "2026-09-07",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día del Trabajo"
    },
    {
      "date": "2026-10-12",
      "name": "Columbus Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Raza / Descubrimiento de América"
    },
    {
      "date": "2026-11-11",
      "name": "Veterans Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día del Veterano / Día del Armisticio"
    },
    {
      "date": "2026-11-19",
      "name": "Discovery of Puerto Rico",
      "type": "public",
      "impact": "medium",
      "localName": "Día del Descubrimiento de Puerto Rico"
    },
    {
      "date": "2026-11-26",
      "name": "Thanksgiving Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de Acción de Gracias"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Noche Buena"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "PT": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Ano Novo"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Sexta-feira Santa"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Domingo de Páscoa"
    },
    {
      "date": "2026-04-25",
      "name": "Freedom Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia da Liberdade"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia do Trabalhador"
    },
    {
      "date": "2026-06-01",
      "name": "Azores Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Dia dos Açores",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-06-04",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium",
      "localName": "Corpo de Deus"
    },
    {
      "date": "2026-06-10",
      "name": "National Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia de Portugal, de Camões e das Comunidades Portuguesas"
    },
    {
      "date": "2026-07-01",
      "name": "Madeira Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Dia da Madeira",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Assunção de Nossa Senhora"
    },
    {
      "date": "2026-10-05",
      "name": "Republic Day",
      "type": "public",
      "impact": "high",
      "localName": "Implantação da República"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de Todos-os-Santos"
    },
    {
      "date": "2026-12-01",
      "name": "Restoration of Independence",
      "type": "public",
      "impact": "high",
      "localName": "Restauração da Independência"
    },
    {
      "date": "2026-12-08",
      "name": "Immaculate Conception",
      "type": "public",
      "impact": "medium",
      "localName": "Imaculada Conceição"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Natal"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Primeira Oitava",
      "description": "地区性公共假日，具体影响以当地安排为准"
    }
  ],
  "PY": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-03-01",
      "name": "Heroes' day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de los héroes"
    },
    {
      "date": "2026-04-02",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Jueves Santo"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de los Trabajadores"
    },
    {
      "date": "2026-05-14",
      "name": "Paraguayan Independence",
      "type": "public",
      "impact": "high",
      "localName": "Independencia"
    },
    {
      "date": "2026-05-15",
      "name": "Paraguayan Independence",
      "type": "public",
      "impact": "high",
      "localName": "Independencia"
    },
    {
      "date": "2026-06-12",
      "name": "Chaco Armistice",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de la Paz del Chaco"
    },
    {
      "date": "2026-08-15",
      "name": "Founding of Asunción",
      "type": "public",
      "impact": "medium",
      "localName": "Fundación de Asunción"
    },
    {
      "date": "2026-09-29",
      "name": "Boqueron Battle Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Victoria de Boquerón"
    },
    {
      "date": "2026-12-08",
      "name": "Virgin of Caacupe",
      "type": "public",
      "impact": "medium",
      "localName": "Virgen de Caacupé"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de Navidad"
    }
  ],
  "RO": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Anul Nou"
    },
    {
      "date": "2026-01-02",
      "name": "Day after New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Anul Nou"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Bobotează"
    },
    {
      "date": "2026-01-07",
      "name": "Saint John the Baptist",
      "type": "public",
      "impact": "medium",
      "localName": "Sfântul Ion"
    },
    {
      "date": "2026-01-24",
      "name": "Union Day/Small Union",
      "type": "public",
      "impact": "medium",
      "localName": "Unirea Principatelor Române/Mica Unire"
    },
    {
      "date": "2026-04-10",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Vinerea mare"
    },
    {
      "date": "2026-04-12",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Paștele"
    },
    {
      "date": "2026-04-13",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Paștele"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Ziua Muncii"
    },
    {
      "date": "2026-05-31",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Rusaliile"
    },
    {
      "date": "2026-06-01",
      "name": "Children's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ziua Copilului"
    },
    {
      "date": "2026-06-01",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Rusaliile"
    },
    {
      "date": "2026-08-15",
      "name": "Dormition of the Theotokos",
      "type": "public",
      "impact": "medium",
      "localName": "Adormirea Maicii Domnului/Sfânta Maria Mare"
    },
    {
      "date": "2026-11-30",
      "name": "St. Andrew's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Sfântul Andrei"
    },
    {
      "date": "2026-12-01",
      "name": "National Day/Great Union",
      "type": "public",
      "impact": "high",
      "localName": "Ziua Națională/Marea Unire"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Crăciunul"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Crăciunul"
    }
  ],
  "RU": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Новый год"
    },
    {
      "date": "2026-01-02",
      "name": "New Year holiday",
      "type": "public",
      "impact": "high",
      "localName": "Новогодние каникулы"
    },
    {
      "date": "2026-01-03",
      "name": "New Year holiday",
      "type": "public",
      "impact": "high",
      "localName": "Новогодние каникулы"
    },
    {
      "date": "2026-01-04",
      "name": "New Year holiday",
      "type": "public",
      "impact": "high",
      "localName": "Новогодние каникулы"
    },
    {
      "date": "2026-01-05",
      "name": "New Year holiday",
      "type": "public",
      "impact": "high",
      "localName": "Новогодние каникулы"
    },
    {
      "date": "2026-01-06",
      "name": "New Year holiday",
      "type": "public",
      "impact": "high",
      "localName": "Новогодние каникулы"
    },
    {
      "date": "2026-01-07",
      "name": "Christmas Day (Orthodox)",
      "type": "public",
      "impact": "high",
      "localName": "Рождество Христово"
    },
    {
      "date": "2026-02-23",
      "name": "Defender of the Fatherland Day",
      "type": "public",
      "impact": "medium",
      "localName": "День защитника Отечества"
    },
    {
      "date": "2026-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high",
      "localName": "Международный женский день"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "День труда"
    },
    {
      "date": "2026-05-09",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "День Победы"
    },
    {
      "date": "2026-06-12",
      "name": "Russia Day",
      "type": "public",
      "impact": "medium",
      "localName": "День России"
    },
    {
      "date": "2026-11-04",
      "name": "Unity Day",
      "type": "public",
      "impact": "medium",
      "localName": "День народного единства"
    }
  ],
  "SC": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-02",
      "name": "New Year Holiday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-04",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "high",
      "localName": "Easter Saturday"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-06-04",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium",
      "localName": "The Fete Dieu"
    },
    {
      "date": "2026-06-18",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "National Day"
    },
    {
      "date": "2026-06-29",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Assumption of Mary"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-08",
      "name": "The Feast of the Immaculate Conception",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "SE": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nyårsdagen"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Trettondedag jul"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Långfredagen"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Påskdagen"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Annandag påsk"
    },
    {
      "date": "2026-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "Första maj"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Kristi himmelsfärdsdag"
    },
    {
      "date": "2026-05-24",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Pingstdagen"
    },
    {
      "date": "2026-06-06",
      "name": "National Day of Sweden",
      "type": "public",
      "impact": "high",
      "localName": "Sveriges nationaldag"
    },
    {
      "date": "2026-06-19",
      "name": "Midsummer Eve",
      "type": "public",
      "impact": "medium",
      "localName": "Midsommarafton"
    },
    {
      "date": "2026-06-20",
      "name": "Midsummer Day",
      "type": "public",
      "impact": "medium",
      "localName": "Midsommardagen"
    },
    {
      "date": "2026-10-31",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Alla helgons dag"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Julafton"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Juldagen"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Annandag jul"
    },
    {
      "date": "2026-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high",
      "localName": "Nyårsafton"
    }
  ],
  "SG": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-02-17",
      "name": "Chinese New Year",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-02-18",
      "name": "Chinese New Year",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-03-21",
      "name": "Hari Raya Puasa",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-27",
      "name": "Hari Raya Haji",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-01",
      "name": "Vesak Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-08-10",
      "name": "National Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-11-09",
      "name": "Deepavali",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "SI": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "novo leto"
    },
    {
      "date": "2026-01-02",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "novo leto"
    },
    {
      "date": "2026-02-08",
      "name": "Prešeren Day",
      "type": "public",
      "impact": "medium",
      "localName": "Prešernov dan"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "velikonočna nedelja in ponedeljek"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "velikonočna nedelja in ponedeljek"
    },
    {
      "date": "2026-04-27",
      "name": "Day of Uprising Against Occupation",
      "type": "public",
      "impact": "medium",
      "localName": "dan upora proti okupatorju"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "praznik dela"
    },
    {
      "date": "2026-05-02",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "praznik dela"
    },
    {
      "date": "2026-05-24",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "binkoštna nedelja"
    },
    {
      "date": "2026-06-25",
      "name": "Statehood Day",
      "type": "public",
      "impact": "medium",
      "localName": "dan državnosti"
    },
    {
      "date": "2026-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Marijino vnebovzetje"
    },
    {
      "date": "2026-10-31",
      "name": "Reformation Day",
      "type": "public",
      "impact": "medium",
      "localName": "dan reformacije"
    },
    {
      "date": "2026-11-01",
      "name": "Day of the Dead",
      "type": "public",
      "impact": "medium",
      "localName": "dan spomina na mrtve"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "božič"
    },
    {
      "date": "2026-12-26",
      "name": "Independence and Unity Day",
      "type": "public",
      "impact": "high",
      "localName": "dan samostojnosti in enotnosti"
    }
  ],
  "SK": [
    {
      "date": "2026-01-01",
      "name": "Day of the Establishment of the Slovak Republic",
      "type": "public",
      "impact": "high",
      "localName": "Deň vzniku Slovenskej republiky"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Zjavenie Pána"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Veľkonočný piatok"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Veľkonočný pondelok"
    },
    {
      "date": "2026-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "Sviatok práce"
    },
    {
      "date": "2026-07-05",
      "name": "St. Cyril and Methodius Day",
      "type": "public",
      "impact": "medium",
      "localName": "Sviatok svätého Cyrila a svätého Metoda"
    },
    {
      "date": "2026-08-29",
      "name": "Slovak National Uprising anniversary",
      "type": "public",
      "impact": "high",
      "localName": "Výročie Slovenského národného povstania"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints’ Day",
      "type": "public",
      "impact": "medium",
      "localName": "Sviatok Všetkých svätých"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Štedrý deň"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Prvý sviatok vianočný"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Druhý sviatok vianočný"
    }
  ],
  "SR": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-06",
      "name": "Three Kings Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-01-18",
      "name": "World Religion Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-02-17",
      "name": "Chinese New Year",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-02-25",
      "name": "Day of the Revolution",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-05",
      "name": "Indian Arrival Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-07-01",
      "name": "Keti Koti",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-08",
      "name": "Javanese Arrival Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-09",
      "name": "Indigenous People's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-10-10",
      "name": "Day of the Maroons",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-10-20",
      "name": "Chinese Arrival day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-11-25",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "SV": [
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día del Trabajo"
    },
    {
      "date": "2026-05-03",
      "name": "The Day of the Cross",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Cru"
    },
    {
      "date": "2026-05-07",
      "name": "Soldiers' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día del Soldado"
    },
    {
      "date": "2026-05-10",
      "name": "Mother's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de las Madres"
    },
    {
      "date": "2026-05-10",
      "name": "Father's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día del Padre"
    },
    {
      "date": "2026-08-01",
      "name": "August Festivals",
      "type": "public",
      "impact": "medium",
      "localName": "Fiestas de agosto"
    },
    {
      "date": "2026-08-02",
      "name": "August Festivals",
      "type": "public",
      "impact": "medium",
      "localName": "Fiestas de agosto"
    },
    {
      "date": "2026-08-03",
      "name": "August Festivals",
      "type": "public",
      "impact": "medium",
      "localName": "Fiestas de agosto"
    },
    {
      "date": "2026-08-04",
      "name": "August Festivals",
      "type": "public",
      "impact": "medium",
      "localName": "Fiestas de agosto"
    },
    {
      "date": "2026-08-05",
      "name": "August Festivals",
      "type": "public",
      "impact": "medium",
      "localName": "Fiestas de agosto"
    },
    {
      "date": "2026-08-06",
      "name": "August Festivals",
      "type": "public",
      "impact": "medium",
      "localName": "Fiestas de agosto"
    },
    {
      "date": "2026-08-07",
      "name": "August Festivals",
      "type": "public",
      "impact": "medium",
      "localName": "Fiestas de agosto"
    },
    {
      "date": "2026-09-15",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia"
    },
    {
      "date": "2026-10-01",
      "name": "Children's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día del niño"
    },
    {
      "date": "2026-10-12",
      "name": "Ethnic Pride Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la raza"
    },
    {
      "date": "2026-11-02",
      "name": "Day of the Dead",
      "type": "public",
      "impact": "medium",
      "localName": "El día de los difuntos"
    },
    {
      "date": "2026-11-07",
      "name": "National Pupusa Festival",
      "type": "public",
      "impact": "high",
      "localName": "Festival Nacional De La Pupusa"
    },
    {
      "date": "2026-11-08",
      "name": "National Pupusa Festival",
      "type": "public",
      "impact": "high",
      "localName": "Festival Nacional De La Pupusa"
    },
    {
      "date": "2026-11-09",
      "name": "National Pupusa Festival",
      "type": "public",
      "impact": "high",
      "localName": "Festival Nacional De La Pupusa"
    },
    {
      "date": "2026-11-10",
      "name": "National Pupusa Festival",
      "type": "public",
      "impact": "high",
      "localName": "Festival Nacional De La Pupusa"
    },
    {
      "date": "2026-11-11",
      "name": "National Pupusa Festival",
      "type": "public",
      "impact": "high",
      "localName": "Festival Nacional De La Pupusa"
    },
    {
      "date": "2026-11-12",
      "name": "National Pupusa Festival",
      "type": "public",
      "impact": "high",
      "localName": "Festival Nacional De La Pupusa"
    },
    {
      "date": "2026-11-13",
      "name": "National Pupusa Festival",
      "type": "public",
      "impact": "high",
      "localName": "Festival Nacional De La Pupusa"
    },
    {
      "date": "2026-11-21",
      "name": "Day of the Queen of Peace",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de la Reina de la Paz"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Noche Buena"
    },
    {
      "date": "2026-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high",
      "localName": "Fin de año"
    }
  ],
  "SX": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nieuwjaarsdag"
    },
    {
      "date": "2026-02-16",
      "name": "Carnival Day",
      "type": "public",
      "impact": "medium",
      "localName": "Karnaval"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Goede vrijdag"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Pasen"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-27",
      "name": "King's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Koningsdag"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Dag van de Arbeid"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Hemelvaartsdag"
    },
    {
      "date": "2026-05-24",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Pinksteren"
    },
    {
      "date": "2026-07-01",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-10-10",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-11-11",
      "name": "Sint Maarten Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Kerstmis"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Tweede kerstdag"
    }
  ],
  "TC": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-03-09",
      "name": "Commonwealth Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-25",
      "name": "JAGS McCartney Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-25",
      "name": "King's Birthday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-01",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-31",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-09-25",
      "name": "National Youth Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-10-12",
      "name": "National Heritage Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "TN": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "رأس السنة الميلادية"
    },
    {
      "date": "2026-03-20",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "عيد الاستقلال"
    },
    {
      "date": "2026-04-09",
      "name": "Martyrs' Day",
      "type": "public",
      "impact": "medium",
      "localName": "عيد الشهداء"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "عيد الشغل"
    },
    {
      "date": "2026-07-25",
      "name": "Republic Day",
      "type": "public",
      "impact": "high",
      "localName": "عيد الجمهورية"
    },
    {
      "date": "2026-08-13",
      "name": "Women's Day",
      "type": "public",
      "impact": "medium",
      "localName": "عيد المرأة"
    },
    {
      "date": "2026-10-15",
      "name": "Evacuation Day",
      "type": "public",
      "impact": "medium",
      "localName": "عيد الجلاء"
    },
    {
      "date": "2026-12-17",
      "name": "Revolution Day",
      "type": "public",
      "impact": "medium",
      "localName": "عيد الثورة"
    }
  ],
  "TR": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Yılbaşı"
    },
    {
      "date": "2026-04-23",
      "name": "National Independence & Children's Day",
      "type": "public",
      "impact": "high",
      "localName": "Ulusal Egemenlik ve Çocuk Bayramı"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "İşçi Bayramı"
    },
    {
      "date": "2026-05-19",
      "name": "Atatürk Commemoration & Youth Day",
      "type": "public",
      "impact": "medium",
      "localName": "Atatürk'ü Anma, Gençlik ve Spor Bayramı"
    },
    {
      "date": "2026-07-15",
      "name": "Democracy and National Unity Day",
      "type": "public",
      "impact": "high",
      "localName": "Demokrasi ve Millî Birlik Günü"
    },
    {
      "date": "2026-08-30",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Zafer Bayramı"
    },
    {
      "date": "2026-10-29",
      "name": "Republic Day",
      "type": "public",
      "impact": "high",
      "localName": "Cumhuriyet Bayramı"
    }
  ],
  "TT": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-03-30",
      "name": "Spiritual Baptist Shouter Liberation Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-30",
      "name": "Indian Arrival Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-04",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-19",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-08-01",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-31",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-09-24",
      "name": "Republic Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "UA": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Новий Рік"
    },
    {
      "date": "2026-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high",
      "localName": "Міжнародний жіночий день"
    },
    {
      "date": "2026-04-12",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Великдень"
    },
    {
      "date": "2026-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "День праці"
    },
    {
      "date": "2026-05-08",
      "name": "Victory day over Nazism in World War II",
      "type": "public",
      "impact": "high",
      "localName": "День перемоги над нацизмом у Другій світовій війні"
    },
    {
      "date": "2026-05-31",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Трійця"
    },
    {
      "date": "2026-06-28",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "День Конституції"
    },
    {
      "date": "2026-07-15",
      "name": "Statehood Day",
      "type": "public",
      "impact": "medium",
      "localName": "День Української Державності"
    },
    {
      "date": "2026-08-24",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "День Незалежності"
    },
    {
      "date": "2026-10-01",
      "name": "Defender of Ukraine Day",
      "type": "public",
      "impact": "medium",
      "localName": "День захисників і захисниць України"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Різдво Христове"
    }
  ],
  "UG": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-26",
      "name": "Liberation Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-02-16",
      "name": "Archbishop Janani Luwum Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-06-03",
      "name": "Martyrs' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-09",
      "name": "National Heroes' Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-10-09",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "US": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-19",
      "name": "Martin Luther King, Jr. Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-02-16",
      "name": "Presidents Day",
      "type": "public",
      "impact": "medium",
      "localName": "Washington's Birthday"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-05-08",
      "name": "Truman Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-05-25",
      "name": "Memorial Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-19",
      "name": "Juneteenth National Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-07-03",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-09-07",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Labor Day"
    },
    {
      "date": "2026-10-12",
      "name": "Columbus Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-10-12",
      "name": "Indigenous Peoples' Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2026-11-11",
      "name": "Veterans Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-11-26",
      "name": "Thanksgiving Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "UY": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2026-01-06",
      "name": "Children's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de los Niños"
    },
    {
      "date": "2026-02-16",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2026-02-17",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2026-04-02",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Semana de Turismo"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Semana de Turismo"
    },
    {
      "date": "2026-04-19",
      "name": "Landing of the 33 Patriots Day",
      "type": "public",
      "impact": "medium",
      "localName": "Desembarco de los 33 Orientales"
    },
    {
      "date": "2026-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de los Trabajadores"
    },
    {
      "date": "2026-05-18",
      "name": "Battle of Las Piedras",
      "type": "public",
      "impact": "medium",
      "localName": "Batalla de las Piedras"
    },
    {
      "date": "2026-06-19",
      "name": "Birthday of José Gervasio Artigas and Never Again Day",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio de Artigas y Día del Nunca Más"
    },
    {
      "date": "2026-07-18",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Jura de la Constitución"
    },
    {
      "date": "2026-08-25",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia"
    },
    {
      "date": "2026-10-12",
      "name": "Day of the race",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Raza"
    },
    {
      "date": "2026-11-02",
      "name": "Deceased ones day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de los Difuntos"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Familia"
    }
  ],
  "VC": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-02-16",
      "name": "Carnival Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-02-17",
      "name": "Carnival Tuesday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-03-14",
      "name": "National Heroes Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-05",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-10-27",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "VE": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de Año Nuevo"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Reyes"
    },
    {
      "date": "2026-02-16",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2026-02-17",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2026-03-19",
      "name": "Saint Joseph's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de San José"
    },
    {
      "date": "2026-04-19",
      "name": "Beginning of the Independence Movement",
      "type": "public",
      "impact": "high",
      "localName": "Proclamación de la Independencia"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día del Trabajador"
    },
    {
      "date": "2026-05-14",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Ascención"
    },
    {
      "date": "2026-06-04",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-24",
      "name": "Anniversary of the Battle of Carabobo",
      "type": "public",
      "impact": "medium",
      "localName": "Aniversario de la Batalla de Carabobo"
    },
    {
      "date": "2026-07-05",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Cinco de julio"
    },
    {
      "date": "2026-07-24",
      "name": "Simón Bolívar's Birthday",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio del Libertador Simón Bolívar"
    },
    {
      "date": "2026-10-12",
      "name": "Day of Indigenous Resistance",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Resistencia Indígena"
    },
    {
      "date": "2026-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Todos los Santos"
    },
    {
      "date": "2026-12-08",
      "name": "Immaculate Conception Day",
      "type": "public",
      "impact": "medium",
      "localName": "La Inmaculada Concepción"
    },
    {
      "date": "2026-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Nochebuena"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    },
    {
      "date": "2026-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high",
      "localName": "Nochevieja"
    }
  ],
  "VG": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-03-09",
      "name": "Lavity Stoutt's Birthday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-25",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-12",
      "name": "Sovereign's Birthday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-07-01",
      "name": "Virgin Islands Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-03",
      "name": "Emancipation Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-04",
      "name": "Emancipation Tuesday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-05",
      "name": "Emancipation Wednesday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-10-19",
      "name": "Heroes and Foreparents Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-11-23",
      "name": "The 1949 Great March and Restoration Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-28",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "VI": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Three Kings Day"
    },
    {
      "date": "2026-01-19",
      "name": "Martin Luther King, Jr. Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-02-16",
      "name": "Presidents Day",
      "type": "public",
      "impact": "medium",
      "localName": "President's Day"
    },
    {
      "date": "2026-03-31",
      "name": "Transfer Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-02",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Holy Thursday"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-25",
      "name": "Memorial Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-19",
      "name": "Juneteenth National Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-07-03",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-07-03",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-09-07",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Labor Day"
    },
    {
      "date": "2026-10-12",
      "name": "Columbus Day",
      "type": "public",
      "impact": "medium",
      "localName": "Virgin Islands–Puerto Rico Friendship Day & Columbus Day"
    },
    {
      "date": "2026-11-11",
      "name": "Veterans Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-11-26",
      "name": "Thanksgiving Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "high",
      "localName": "Second Day of Christmas"
    }
  ],
  "VN": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Tết dương lịch"
    },
    {
      "date": "2026-04-30",
      "name": "Reunification Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ngày Giải phóng miền Nam, thống nhất đất nước"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Ngày Quốc tế lao động"
    },
    {
      "date": "2026-09-02",
      "name": "National Day",
      "type": "public",
      "impact": "high",
      "localName": "Quốc khánh"
    }
  ],
  "WS": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-01-02",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-04",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-11",
      "name": "Mother's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-01",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-08-10",
      "name": "Father's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-10-12",
      "name": "Lotu a Tamaiti",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "ZA": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-03-21",
      "name": "Human Rights Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Family Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-27",
      "name": "Freedom Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-01",
      "name": "Workers' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-06-16",
      "name": "Youth Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-10",
      "name": "National Women's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-09-24",
      "name": "Heritage Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-16",
      "name": "Day of Reconciliation",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "Day of Goodwill",
      "type": "public",
      "impact": "medium",
      "localName": "St. Stephen's Day"
    }
  ],
  "ZM": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-03-09",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-03-12",
      "name": "Youth Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-04",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "high",
      "localName": "Easter Saturday"
    },
    {
      "date": "2026-04-05",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-28",
      "name": "Kenneth Kaunda's Birthday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-25",
      "name": "African Freedom Day",
      "type": "public",
      "impact": "medium",
      "localName": "Africa Freedom Day"
    },
    {
      "date": "2026-07-06",
      "name": "Heroes' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-07-07",
      "name": "Unity Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-03",
      "name": "Farmers' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-10-19",
      "name": "National Day of Prayer",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-10-26",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "ZW": [
    {
      "date": "2026-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-02-21",
      "name": "Robert Mugabe National Youth Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-03",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-04",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "high",
      "localName": "Easter Saturday"
    },
    {
      "date": "2026-04-06",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-04-18",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-05-01",
      "name": "Worker's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-05-25",
      "name": "Africa Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-10",
      "name": "Heroes' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-08-11",
      "name": "Defence Forces Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-22",
      "name": "Unity Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2026-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2026-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ]
}

export const generatedHolidays2027: Record<string, Holiday[]> = {
  "AG": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-03",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-02",
      "name": "Carnival Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-03",
      "name": "Carnival Tuesday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-09-09",
      "name": "National Day of Prayer",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-11-01",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-09",
      "name": "National Heroes' Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    },
    {
      "date": "2027-12-28",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "AM": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Ամանոր"
    },
    {
      "date": "2027-01-02",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Ամանոր"
    },
    {
      "date": "2027-01-05",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Սուրբ Ծնունդ"
    },
    {
      "date": "2027-01-06",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Սուրբ Ծնունդ"
    },
    {
      "date": "2027-01-28",
      "name": "Army Day",
      "type": "public",
      "impact": "medium",
      "localName": "Բանակի օր"
    },
    {
      "date": "2027-03-08",
      "name": "Women's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Կանանց տոն"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Ամանոր"
    },
    {
      "date": "2027-04-24",
      "name": "Armenian Genocide Remembrance Day",
      "type": "public",
      "impact": "medium",
      "localName": "Եղեռնի զոհերի հիշատակի օր"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Աշխատանքի օր"
    },
    {
      "date": "2027-05-09",
      "name": "Victory and Peace Day",
      "type": "public",
      "impact": "high",
      "localName": "Հաղթանակի և Խաղաղության տոն"
    },
    {
      "date": "2027-05-28",
      "name": "Republic Day",
      "type": "public",
      "impact": "high",
      "localName": "Հանրապետության օր"
    },
    {
      "date": "2027-07-05",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Սահմանադրության օր"
    },
    {
      "date": "2027-09-21",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Անկախության օր"
    },
    {
      "date": "2027-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high",
      "localName": "Ամանոր"
    }
  ],
  "AO": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia de Ano Novo"
    },
    {
      "date": "2027-02-04",
      "name": "Liberation Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia da Libertação"
    },
    {
      "date": "2027-02-05",
      "name": "Liberation Day (Ponte)",
      "type": "public",
      "impact": "high",
      "localName": "Dia da Libertação (Ponte)"
    },
    {
      "date": "2027-02-08",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2027-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia Internacional da Mulher"
    },
    {
      "date": "2027-03-22",
      "name": "Day of the Liberation of Southern Africa (Ponte)",
      "type": "public",
      "impact": "high",
      "localName": "Dia da Libertação da África Austral (Ponte)"
    },
    {
      "date": "2027-03-23",
      "name": "Day of the Liberation of Southern Africa",
      "type": "public",
      "impact": "high",
      "localName": "Dia da Libertação da África Austral"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Sexta Feira Santa"
    },
    {
      "date": "2027-04-04",
      "name": "Peace Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia da Paz"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia do Trabalhador"
    },
    {
      "date": "2027-09-17",
      "name": "National Heroes' Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia do Fundador da Nação e do Herói Nacional"
    },
    {
      "date": "2027-11-01",
      "name": "All Souls' Day (Ponte)",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de Finados (Ponte)"
    },
    {
      "date": "2027-11-02",
      "name": "All Souls' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de Finados"
    },
    {
      "date": "2027-11-11",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia da Independência"
    },
    {
      "date": "2027-11-12",
      "name": "Independence Day (Ponte)",
      "type": "public",
      "impact": "high",
      "localName": "Dia da Independência (Ponte)"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia de Natal"
    }
  ],
  "AR": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2027-02-08",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2027-02-09",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2027-03-24",
      "name": "Day of Remembrance for Truth and Justice",
      "type": "public",
      "impact": "medium",
      "localName": "Día Nacional de la Memoria por la Verdad y la Justicia"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2027-04-02",
      "name": "Day of the Veterans and Fallen of the Malvinas War",
      "type": "public",
      "impact": "medium",
      "localName": "Día del Veterano y de los Caídos en la Guerra de Malvinas"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día del Trabajador"
    },
    {
      "date": "2027-05-25",
      "name": "May Revolution",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Revolución de Mayo"
    },
    {
      "date": "2027-06-20",
      "name": "General Manuel Belgrano Memorial Day",
      "type": "public",
      "impact": "medium",
      "localName": "Paso a la Inmortalidad del General Manuel Belgrano"
    },
    {
      "date": "2027-06-21",
      "name": "Anniversary of the Passing of General Martín Miguel de Güemes",
      "type": "public",
      "impact": "medium",
      "localName": "Paso a la Inmortalidad del General Martín Miguel de Güemes"
    },
    {
      "date": "2027-07-09",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia"
    },
    {
      "date": "2027-08-16",
      "name": "General José de San Martín Memorial Day",
      "type": "public",
      "impact": "medium",
      "localName": "Paso a la Inmortalidad del General José de San Martín"
    },
    {
      "date": "2027-10-11",
      "name": "Day of Respect for Cultural Diversity",
      "type": "public",
      "impact": "medium",
      "localName": "Día del Respeto a la Diversidad Cultural"
    },
    {
      "date": "2027-11-20",
      "name": "National Sovereignty Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Soberanía Nacional"
    },
    {
      "date": "2027-12-08",
      "name": "Immaculate Conception Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Inmaculada Concepción de María"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "AT": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Neujahr"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Heilige Drei Könige"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Ostersonntag"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Ostermontag"
    },
    {
      "date": "2027-05-01",
      "name": "National Holiday",
      "type": "public",
      "impact": "high",
      "localName": "Staatsfeiertag"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Christi Himmelfahrt"
    },
    {
      "date": "2027-05-16",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Pfingstsonntag"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Pfingstmontag"
    },
    {
      "date": "2027-05-27",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium",
      "localName": "Fronleichnam"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Maria Himmelfahrt"
    },
    {
      "date": "2027-10-26",
      "name": "National Holiday",
      "type": "public",
      "impact": "high",
      "localName": "Nationalfeiertag"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Allerheiligen"
    },
    {
      "date": "2027-12-08",
      "name": "Immaculate Conception",
      "type": "public",
      "impact": "medium",
      "localName": "Mariä Empfängnis"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Weihnachten"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Stefanitag"
    }
  ],
  "AU": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-26",
      "name": "Australia Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-01",
      "name": "Labour Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-08",
      "name": "Canberra Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-08",
      "name": "Adelaide Cup Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-08",
      "name": "Eight Hours Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-08",
      "name": "Labour Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-27",
      "name": "Holy Saturday",
      "type": "regional",
      "impact": "medium",
      "localName": "Easter Eve",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-04-25",
      "name": "Anzac Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-04-26",
      "name": "Anzac Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-03",
      "name": "May Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-03",
      "name": "Labour Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-31",
      "name": "Reconciliation Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-06-07",
      "name": "Western Australia Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-06-14",
      "name": "King's Birthday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-08-02",
      "name": "Picnic Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-09-24",
      "name": "Friday before AFL Grand Final (Tentative Date)",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-09-27",
      "name": "King's Birthday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-10-04",
      "name": "Labour Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-10-04",
      "name": "King's Birthday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-11-02",
      "name": "Melbourne Cup",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-12-27",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-28",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "AW": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nieuwjaarsdag"
    },
    {
      "date": "2027-01-25",
      "name": "Betico Croes Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dag van Betico Croes"
    },
    {
      "date": "2027-02-08",
      "name": "Carnival Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval Maandag"
    },
    {
      "date": "2027-03-18",
      "name": "National Anthem and Flag Day",
      "type": "public",
      "impact": "high",
      "localName": "Dag van het Volkslied en de Vlag"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Goede Vrijdag"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Eerste Paasdag"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Tweede Paasedag"
    },
    {
      "date": "2027-04-27",
      "name": "King's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Koningsdag"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Dag van de Arbeid"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Hemelvaartsdag"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Eerste Kerstdag"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Tweede Kerstdag"
    }
  ],
  "BB": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-21",
      "name": "Errol Barrow Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-04-28",
      "name": "National Heroes' Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-01",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-02",
      "name": "Kadooment Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-11-30",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "BD": [
    {
      "date": "2027-02-21",
      "name": "International Mother Language Day",
      "type": "public",
      "impact": "high",
      "localName": "শহিদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস"
    },
    {
      "date": "2027-03-26",
      "name": "Independence and National Day",
      "type": "public",
      "impact": "high",
      "localName": "স্বাধীনতা ও জাতীয় দিবস"
    },
    {
      "date": "2027-04-14",
      "name": "Bengali New Year",
      "type": "public",
      "impact": "high",
      "localName": "নববর্ষ"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "মে দিবস"
    },
    {
      "date": "2027-08-05",
      "name": "July Mass Uprising Day",
      "type": "public",
      "impact": "medium",
      "localName": "জুলাই গণঅভ্যুত্থান দিবস"
    },
    {
      "date": "2027-12-16",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "বিজয় দিবস"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "বড়দিন"
    }
  ],
  "BE": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nieuwjaar"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Goede Vrijdag"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Pasen"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Paasmaandag"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Dag van de arbeid"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Onze Lieve Heer hemel"
    },
    {
      "date": "2027-05-07",
      "name": "Day after Ascension Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Pinkstermaandag"
    },
    {
      "date": "2027-07-21",
      "name": "Belgian National Day",
      "type": "public",
      "impact": "high",
      "localName": "Nationale feestdag"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Onze Lieve Vrouw hemelvaart"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Allerheiligen"
    },
    {
      "date": "2027-11-11",
      "name": "Armistice Day",
      "type": "public",
      "impact": "medium",
      "localName": "Wapenstilstand"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Kerstdag"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "BG": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Нова година"
    },
    {
      "date": "2027-03-03",
      "name": "Liberation Day",
      "type": "public",
      "impact": "high",
      "localName": "Ден на oсвобождението на България от Oсманско робство"
    },
    {
      "date": "2027-04-30",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Разпети петък"
    },
    {
      "date": "2027-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "Ден на труда и на международната работническа солидарност"
    },
    {
      "date": "2027-05-01",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium",
      "localName": "Велика събота"
    },
    {
      "date": "2027-05-02",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Великден"
    },
    {
      "date": "2027-05-03",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Велики понеделник"
    },
    {
      "date": "2027-05-06",
      "name": "Saint George's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Гергьовден, ден на храбростта и Българската армия"
    },
    {
      "date": "2027-05-24",
      "name": "Saints Cyril and Methodius Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ден на Българската просвета и култура и на славянската писменост"
    },
    {
      "date": "2027-09-06",
      "name": "Unification Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ден на съединението"
    },
    {
      "date": "2027-09-22",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Ден на независимостта на България"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Бъдни вечер"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Рождество Христово"
    },
    {
      "date": "2027-12-27",
      "name": "Second day of Christmas",
      "type": "public",
      "impact": "high",
      "localName": "Рождество Христово"
    }
  ],
  "BM": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-28",
      "name": "Bermuda Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-21",
      "name": "National Heroes Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-07-29",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-07-30",
      "name": "Mary Prince Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-09-06",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-11-11",
      "name": "Remembrance Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-27",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-27",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "BO": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2027-02-02",
      "name": "Feast of the Virgin of Candelaria",
      "type": "public",
      "impact": "medium",
      "localName": "Fiesta de la Virgen de Candelaria"
    },
    {
      "date": "2027-02-08",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Feriado por Carnaval"
    },
    {
      "date": "2027-02-09",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Feriado por Carnaval"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia del trabajo"
    },
    {
      "date": "2027-05-27",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-21",
      "name": "Andean New Year",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo Andino"
    },
    {
      "date": "2027-08-02",
      "name": "Agrarian Reform Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Revolución Agraria"
    },
    {
      "date": "2027-08-06",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia de la Patria"
    },
    {
      "date": "2027-11-02",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Todos Santos"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "BR": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Confraternização Universal"
    },
    {
      "date": "2027-02-08",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2027-02-09",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Sexta-feira Santa"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Domingo de Páscoa"
    },
    {
      "date": "2027-04-21",
      "name": "Tiradentes",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de Tiradentes"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia do Trabalhador"
    },
    {
      "date": "2027-05-27",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-07-09",
      "name": "Constitutionalist Revolution of 1932",
      "type": "regional",
      "impact": "medium",
      "localName": "Revolução Constitucionalista de 1932",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-09-07",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia da Independência"
    },
    {
      "date": "2027-10-12",
      "name": "Our Lady of Aparecida",
      "type": "public",
      "impact": "medium",
      "localName": "Nossa Senhora Aparecida"
    },
    {
      "date": "2027-11-02",
      "name": "All Souls' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de Finados"
    },
    {
      "date": "2027-11-15",
      "name": "Republic Proclamation Day",
      "type": "public",
      "impact": "high",
      "localName": "Proclamação da República"
    },
    {
      "date": "2027-11-20",
      "name": "Black Awareness Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia da Consciência Negra"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Natal"
    }
  ],
  "BS": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-11",
      "name": "Majority Rule Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-04-02",
      "name": "Perry Christie Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-07-10",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-08-06",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-10-11",
      "name": "National Heroes' Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "BW": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-07-01",
      "name": "Sir Seretse Khama Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-07-19",
      "name": "Presidents' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-09-30",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-10-01",
      "name": "Botswana Day holiday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "BY": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Новы год"
    },
    {
      "date": "2027-01-02",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Новы год"
    },
    {
      "date": "2027-01-07",
      "name": "Christmas Day (Orthodox)",
      "type": "public",
      "impact": "high",
      "localName": "Каляды праваслаўныя"
    },
    {
      "date": "2027-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high",
      "localName": "Мiжнародны жаночы дзень"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Дзень працы"
    },
    {
      "date": "2027-05-09",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Дзень Перамогi"
    },
    {
      "date": "2027-05-11",
      "name": "Commemoration Day",
      "type": "public",
      "impact": "medium",
      "localName": "Радунiца"
    },
    {
      "date": "2027-07-03",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Дзень Незалежнасцi"
    },
    {
      "date": "2027-11-07",
      "name": "October Revolution Day",
      "type": "public",
      "impact": "medium",
      "localName": "Дзень Кастрычніцкай рэвалюцыі"
    },
    {
      "date": "2027-12-25",
      "name": "Catholic Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Каляды каталiцкiя"
    }
  ],
  "BZ": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-15",
      "name": "George Price Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-08",
      "name": "National Heroes and Benefactors Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-27",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-08-02",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-09-10",
      "name": "Saint George's Caye Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-09-21",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-11-19",
      "name": "Garifuna Settlement Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-27",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "CA": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-02-15",
      "name": "Louis Riel Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-02-15",
      "name": "Islander Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-02-15",
      "name": "Heritage Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-02-15",
      "name": "Family Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-17",
      "name": "Saint Patrick's Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-04-23",
      "name": "Saint George's Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-24",
      "name": "National Patriots' Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-24",
      "name": "Victoria Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-21",
      "name": "National Aboriginal Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-06-24",
      "name": "Discovery Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-06-24",
      "name": "National Holiday",
      "type": "regional",
      "impact": "medium",
      "localName": "Fête nationale du Québec",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-07-01",
      "name": "Canada Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-07-12",
      "name": "Orangemen's Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-08-02",
      "name": "Civic Holiday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-08-02",
      "name": "British Columbia Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-08-02",
      "name": "Heritage Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-08-02",
      "name": "New Brunswick Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-08-02",
      "name": "Natal Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-08-02",
      "name": "Saskatchewan Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-08-16",
      "name": "Gold Cup Parade Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-08-16",
      "name": "Discovery Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-09-06",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-09-30",
      "name": "National Day for Truth and Reconciliation",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-10-11",
      "name": "Thanksgiving",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-11-11",
      "name": "Armistice Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-11-11",
      "name": "Remembrance Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Boxing Day",
      "description": "地区性公共假日，具体影响以当地安排为准"
    }
  ],
  "CH": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Neujahr"
    },
    {
      "date": "2027-01-02",
      "name": "St. Berchtold's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Berchtoldstag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "regional",
      "impact": "medium",
      "localName": "Heilige Drei Könige",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-01",
      "name": "Republic Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Jahrestag der Ausrufung der Republik",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-19",
      "name": "Saint Joseph's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Josefstag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "regional",
      "impact": "medium",
      "localName": "Karfreitag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "regional",
      "impact": "medium",
      "localName": "Ostermontag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-04-04",
      "name": "Näfels procession",
      "type": "regional",
      "impact": "medium",
      "localName": "Näfelser Fahrt",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Tag der Arbeit",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Auffahrt"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "regional",
      "impact": "medium",
      "localName": "Pfingstmontag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-27",
      "name": "Corpus Christi",
      "type": "regional",
      "impact": "medium",
      "localName": "Fronleichnam",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-08-01",
      "name": "Swiss National Day",
      "type": "public",
      "impact": "high",
      "localName": "Bundesfeier"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption of the Virgin Mary",
      "type": "regional",
      "impact": "medium",
      "localName": "Maria Himmelfahrt",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-09-09",
      "name": "Geneva Prayday",
      "type": "regional",
      "impact": "medium",
      "localName": "Jeûne genevois",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-09-20",
      "name": "Federal Fast Monday",
      "type": "regional",
      "impact": "medium",
      "localName": "Bettagsmontag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Allerheiligen",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-12-08",
      "name": "Immaculate Conception",
      "type": "regional",
      "impact": "medium",
      "localName": "Mariä Empfängnis",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Weihnachten"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Stephanstag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-12-31",
      "name": "Restoration Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Restauration de la République",
      "description": "地区性公共假日，具体影响以当地安排为准"
    }
  ],
  "CL": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2027-03-27",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium",
      "localName": "Sábado Santo"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día del Trabajo"
    },
    {
      "date": "2027-05-21",
      "name": "Navy Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de las Glorias Navales"
    },
    {
      "date": "2027-06-07",
      "name": "Battle of Arica",
      "type": "regional",
      "impact": "medium",
      "localName": "Asalto y Toma del Morro de Arica",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-06-21",
      "name": "National Day of Indigenous Peoples",
      "type": "public",
      "impact": "high",
      "localName": "Día Nacional de los Pueblos Indígenas"
    },
    {
      "date": "2027-06-28",
      "name": "Saint Peter and Saint Paul",
      "type": "public",
      "impact": "medium",
      "localName": "San Pedro y San Pablo"
    },
    {
      "date": "2027-07-16",
      "name": "Our Lady of Mount Carmel",
      "type": "public",
      "impact": "medium",
      "localName": "Virgen del Carmen"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption of Mary",
      "type": "public",
      "impact": "medium",
      "localName": "Asunción de la Virgen"
    },
    {
      "date": "2027-09-18",
      "name": "National holiday",
      "type": "public",
      "impact": "high",
      "localName": "Fiestas Patrias"
    },
    {
      "date": "2027-09-19",
      "name": "Army Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de las Glorias del Ejército"
    },
    {
      "date": "2027-10-11",
      "name": "Columbus Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día del Descubrimiento de Dos Mundos"
    },
    {
      "date": "2027-10-31",
      "name": "Reformation Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día Nacional de las Iglesias Evangélicas y Protestantes"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Todos los Santos"
    },
    {
      "date": "2027-12-08",
      "name": "Immaculate Conception",
      "type": "public",
      "impact": "medium",
      "localName": "Inmaculada Concepción"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad / Natividad del Señor"
    }
  ],
  "CM": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-02-11",
      "name": "Youth Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-20",
      "name": "National Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "CN": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "元旦"
    },
    {
      "date": "2027-02-06",
      "name": "Chinese New Year (Spring Festival)",
      "type": "public",
      "impact": "high",
      "localName": "春节"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "劳动节"
    },
    {
      "date": "2027-06-09",
      "name": "Dragon Boat Festival",
      "type": "public",
      "impact": "medium",
      "localName": "端午节"
    },
    {
      "date": "2027-09-15",
      "name": "Mid-Autumn Festival",
      "type": "public",
      "impact": "medium",
      "localName": "中秋节"
    },
    {
      "date": "2027-10-01",
      "name": "National Day",
      "type": "public",
      "impact": "high",
      "localName": "国庆节"
    }
  ],
  "CO": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2027-01-11",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Día de los Reyes Magos"
    },
    {
      "date": "2027-03-22",
      "name": "Saint Joseph's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de San José"
    },
    {
      "date": "2027-03-25",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Jueves Santo"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Primero de Mayo"
    },
    {
      "date": "2027-05-10",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ascensión del señor"
    },
    {
      "date": "2027-05-31",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-07",
      "name": "Sacred Heart",
      "type": "public",
      "impact": "medium",
      "localName": "Sagrado Corazón"
    },
    {
      "date": "2027-07-05",
      "name": "Saint Peter and Saint Paul",
      "type": "public",
      "impact": "medium",
      "localName": "San Pedro y San Pablo"
    },
    {
      "date": "2027-07-12",
      "name": "Our Lady of Chiquinquirá Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Virgen de Chiquinquirá"
    },
    {
      "date": "2027-07-20",
      "name": "Declaration of Independence",
      "type": "public",
      "impact": "high",
      "localName": "Declaracion de la Independencia de Colombia"
    },
    {
      "date": "2027-08-07",
      "name": "Battle of Boyacá",
      "type": "public",
      "impact": "medium",
      "localName": "Batalla de Boyacá"
    },
    {
      "date": "2027-08-16",
      "name": "Assumption of Mary",
      "type": "public",
      "impact": "medium",
      "localName": "La Asunción"
    },
    {
      "date": "2027-10-18",
      "name": "Columbus Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Raza"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints’ Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de los Santos"
    },
    {
      "date": "2027-11-15",
      "name": "Independence of Cartagena",
      "type": "public",
      "impact": "high",
      "localName": "Independencia de Cartagena"
    },
    {
      "date": "2027-12-08",
      "name": "Immaculate Conception",
      "type": "public",
      "impact": "medium",
      "localName": "La Inmaculada Concepción"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "CR": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2027-03-25",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Jueves Santo"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2027-04-11",
      "name": "Juan Santamaría Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Juan Santamaría"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día Internacional del Trabajo"
    },
    {
      "date": "2027-07-25",
      "name": "Annexation of the Party of Nicoya to Costa Rica",
      "type": "public",
      "impact": "medium",
      "localName": "Anexión del Partido de Nicoya a Costa Rica"
    },
    {
      "date": "2027-08-02",
      "name": "Feast of Our Lady of the Angels",
      "type": "public",
      "impact": "medium",
      "localName": "Fiesta de Nuestra Señora de los Ángeles"
    },
    {
      "date": "2027-08-15",
      "name": "Mother's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Madre"
    },
    {
      "date": "2027-09-15",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia"
    },
    {
      "date": "2027-12-01",
      "name": "Army Abolition Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Abolición del Ejército"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "CU": [
    {
      "date": "2027-01-01",
      "name": "Triumph of the Revolution",
      "type": "public",
      "impact": "medium",
      "localName": "Triunfo de la Revolución"
    },
    {
      "date": "2027-01-02",
      "name": "Victory of Fidel Castro",
      "type": "public",
      "impact": "high",
      "localName": "Día de Victoria de las Fuerzas Armadas"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de los trabajadores"
    },
    {
      "date": "2027-07-25",
      "name": "Day before the Commemoration of the Assault of the Moncada garrison",
      "type": "public",
      "impact": "medium",
      "localName": "Conmemoración del asalto a Moncada"
    },
    {
      "date": "2027-07-26",
      "name": "Commemoration of the Assault of the Moncada garrison",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Rebeldía Nacional"
    },
    {
      "date": "2027-07-27",
      "name": "Day after the Commemoration of the Assault of the Moncada garrison",
      "type": "public",
      "impact": "medium",
      "localName": "Conmemoración del asalto a Moncada"
    },
    {
      "date": "2027-10-10",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "CY": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Πρωτοχρονιά"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Θεοφάνεια"
    },
    {
      "date": "2027-03-15",
      "name": "Green Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Καθαρή Δευτέρα"
    },
    {
      "date": "2027-03-25",
      "name": "Greek Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Επέτειος Ελληνικής Ανεξαρτησίας"
    },
    {
      "date": "2027-04-01",
      "name": "Cyprus National Day",
      "type": "public",
      "impact": "high",
      "localName": "Κυπριακή Εθνική Επέτειος"
    },
    {
      "date": "2027-04-30",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Μεγάλη Παρασκευή"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Πρωτομαγιά"
    },
    {
      "date": "2027-05-03",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Δευτέρα της Διακαινησίμου"
    },
    {
      "date": "2027-05-04",
      "name": "Easter Tuesday",
      "type": "public",
      "impact": "high",
      "localName": "Τρίτη της Διακαινησίμου"
    },
    {
      "date": "2027-06-20",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Αγίου Πνεύματος"
    },
    {
      "date": "2027-06-21",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Δευτέρα Πεντηκοστής"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption of the Virgin Mary",
      "type": "public",
      "impact": "medium",
      "localName": "Η Κοίμησις της Θεοτόκου"
    },
    {
      "date": "2027-10-01",
      "name": "Cyprus Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Επέτειος Κυπριακής Ανεξαρτησίας"
    },
    {
      "date": "2027-10-28",
      "name": "Ohi Day",
      "type": "public",
      "impact": "medium",
      "localName": "Το Όχι"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Παραμονή Χριστουγέννων"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Χριστούγεννα"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Δεύτερη μέρα των Χριστουγέννων"
    }
  ],
  "CZ": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Den obnovy samostatného českého státu; Nový rok"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Velký pátek"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Velikonoční pondělí"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Svátek práce"
    },
    {
      "date": "2027-05-08",
      "name": "Liberation Day",
      "type": "public",
      "impact": "high",
      "localName": "Den vítězství"
    },
    {
      "date": "2027-07-05",
      "name": "Saints Cyril and Methodius Day",
      "type": "public",
      "impact": "medium",
      "localName": "Den slovanských věrozvěstů Cyrila a Metoděje"
    },
    {
      "date": "2027-07-06",
      "name": "Jan Hus Day",
      "type": "public",
      "impact": "medium",
      "localName": "Den upálení mistra Jana Husa"
    },
    {
      "date": "2027-09-28",
      "name": "St. Wenceslas Day",
      "type": "public",
      "impact": "medium",
      "localName": "Den české státnosti"
    },
    {
      "date": "2027-10-28",
      "name": "Independent Czechoslovak State Day",
      "type": "public",
      "impact": "medium",
      "localName": "Den vzniku samostatného československého státu"
    },
    {
      "date": "2027-11-17",
      "name": "Struggle for Freedom and Democracy Day",
      "type": "public",
      "impact": "medium",
      "localName": "Den boje za svobodu a demokracii a Mezinárodní den studentstva"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Štědrý den"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "1. svátek vánoční"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "2. svátek vánoční"
    }
  ],
  "DE": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Neujahr"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "regional",
      "impact": "medium",
      "localName": "Heilige Drei Könige",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-08",
      "name": "International Women's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Internationaler Frauentag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Karfreitag"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "regional",
      "impact": "medium",
      "localName": "Ostersonntag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Ostermontag"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Tag der Arbeit"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Christi Himmelfahrt"
    },
    {
      "date": "2027-05-16",
      "name": "Pentecost",
      "type": "regional",
      "impact": "medium",
      "localName": "Pfingstsonntag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Pfingstmontag"
    },
    {
      "date": "2027-05-27",
      "name": "Corpus Christi",
      "type": "regional",
      "impact": "medium",
      "localName": "Fronleichnam",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Mariä Himmelfahrt",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-09-20",
      "name": "World Children's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Weltkindertag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-10-03",
      "name": "German Unity Day",
      "type": "public",
      "impact": "medium",
      "localName": "Tag der Deutschen Einheit"
    },
    {
      "date": "2027-10-31",
      "name": "Reformation Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Reformationstag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Allerheiligen",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-11-17",
      "name": "Repentance and Prayer Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Buß- und Bettag",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Erster Weihnachtstag"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Zweiter Weihnachtstag"
    }
  ],
  "DK": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nytårsdag"
    },
    {
      "date": "2027-03-25",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Skærtorsdag"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Langfredag"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Påskedag"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "2. Påskedag"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Kristi Himmelfartsdag"
    },
    {
      "date": "2027-05-07",
      "name": "Bank closing day",
      "type": "public",
      "impact": "medium",
      "localName": "Banklukkedag"
    },
    {
      "date": "2027-05-16",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Pinsedag"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "2. Pinsedag"
    },
    {
      "date": "2027-06-05",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Grundlovsdag"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Juleaftensdag"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Juledag / 1. juledag"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "2. juledag"
    },
    {
      "date": "2027-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high",
      "localName": "Nytårsaftensdag"
    }
  ],
  "DM": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-02-08",
      "name": "Carnival Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-02-09",
      "name": "Carnival Tuesday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-02",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-11-03",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-11-04",
      "name": "Community Service Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "DO": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de Año Nuevo"
    },
    {
      "date": "2027-01-06",
      "name": "Day of Kings",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Reyes"
    },
    {
      "date": "2027-01-21",
      "name": "Our Lady of Altagracia",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Nuestra Señora de la Altagracia"
    },
    {
      "date": "2027-01-26",
      "name": "Duarte's Birthday",
      "type": "public",
      "impact": "medium",
      "localName": "Día del Natalicio de Juan Pablo Duarte"
    },
    {
      "date": "2027-02-27",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia de la República Dominicana"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día del Trabajador"
    },
    {
      "date": "2027-05-27",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-28",
      "name": "Mother's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de las Madres"
    },
    {
      "date": "2027-08-16",
      "name": "Restoration Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Restauración Dominicana"
    },
    {
      "date": "2027-09-24",
      "name": "Our Lady of Mercy",
      "type": "public",
      "impact": "medium",
      "localName": "Nuestra Senora de las Mercedes"
    },
    {
      "date": "2027-11-06",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Constitución"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "DZ": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-12",
      "name": "Amazigh New Year",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-07-05",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-11-01",
      "name": "Revolution Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "EC": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2027-02-08",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2027-02-09",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-24",
      "name": "The Battle of Pichincha",
      "type": "public",
      "impact": "medium",
      "localName": "Batalla de Pichincha"
    },
    {
      "date": "2027-08-10",
      "name": "Declaration of Independence of Quito",
      "type": "public",
      "impact": "high",
      "localName": "Primer Grito de Independencia"
    },
    {
      "date": "2027-10-09",
      "name": "Independence of Guayaquil",
      "type": "public",
      "impact": "high",
      "localName": "Independencia de Guayaquil"
    },
    {
      "date": "2027-11-02",
      "name": "All Souls' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de los Difuntos, Día de Muertos"
    },
    {
      "date": "2027-11-03",
      "name": "Independence of Cuenca",
      "type": "public",
      "impact": "high",
      "localName": "Independencia de Cuenca"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de Navidad"
    }
  ],
  "EE": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "uusaasta"
    },
    {
      "date": "2027-02-24",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "iseseisvuspäev"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "suur reede"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "ülestõusmispühade 1. püha"
    },
    {
      "date": "2027-05-01",
      "name": "Spring Day",
      "type": "public",
      "impact": "medium",
      "localName": "kevadpüha"
    },
    {
      "date": "2027-05-16",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "nelipühade 1. püha"
    },
    {
      "date": "2027-06-23",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "võidupüha and jaanilaupäev"
    },
    {
      "date": "2027-06-24",
      "name": "Midsummer Day",
      "type": "public",
      "impact": "medium",
      "localName": "jaanipäev"
    },
    {
      "date": "2027-08-20",
      "name": "Day of Restoration of Independence",
      "type": "public",
      "impact": "high",
      "localName": "taasiseseisvumispäev"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "jõululaupäev"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "esimene jõulupüha"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "teine jõulupüha"
    }
  ],
  "EG": [
    {
      "date": "2027-01-07",
      "name": "Christmas Day (Orthodox)",
      "type": "public",
      "impact": "high",
      "localName": "عيد الميلاد المجيد"
    },
    {
      "date": "2027-01-25",
      "name": "Revolution Day 2011 / National Police Day",
      "type": "public",
      "impact": "high",
      "localName": "عيد الثورة 25 يناير"
    },
    {
      "date": "2027-04-25",
      "name": "Sinai Liberation Day",
      "type": "public",
      "impact": "high",
      "localName": "عيد تحرير سيناء"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "عيد العمال"
    },
    {
      "date": "2027-07-01",
      "name": "June 30 Revolution",
      "type": "public",
      "impact": "medium",
      "localName": "ثورة 30 يونيو"
    },
    {
      "date": "2027-07-23",
      "name": "Revolution Day",
      "type": "public",
      "impact": "medium",
      "localName": "عيد ثورة 23 يوليو"
    },
    {
      "date": "2027-10-06",
      "name": "Armed Forces Day",
      "type": "public",
      "impact": "medium",
      "localName": "عيد القوات المسلحة"
    }
  ],
  "ES": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Reyes / Epifanía del Señor"
    },
    {
      "date": "2027-02-28",
      "name": "Day of Andalucía",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de Andalucía",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-01",
      "name": "Day of the Balearic Islands",
      "type": "regional",
      "impact": "medium",
      "localName": "Dia de les Illes Balears",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-25",
      "name": "Maundy Thursday",
      "type": "regional",
      "impact": "medium",
      "localName": "Jueves Santo",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "regional",
      "impact": "medium",
      "localName": "Lunes de Pascua",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-04-23",
      "name": "Castile and León Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de Castilla y León",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-04-23",
      "name": "Day of Aragón",
      "type": "regional",
      "impact": "medium",
      "localName": "San Jorge (Día de Aragón)",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Fiesta del trabajo"
    },
    {
      "date": "2027-05-02",
      "name": "Day of Madrid",
      "type": "regional",
      "impact": "medium",
      "localName": "Fiesta de la Comunidad de Madrid",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-17",
      "name": "Galician Literature Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Día das Letras Galegas",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-27",
      "name": "Corpus Christi",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-30",
      "name": "Day of the Canary Islands",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de Canarias",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-31",
      "name": "Day of Castilla-La Mancha",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de la Región Castilla-La Mancha",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-06-09",
      "name": "Day of La Rioja",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de La Rioja",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-06-09",
      "name": "Day of Murcia",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de la Región de Murcia",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-06-24",
      "name": "St. John's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Sant Joan",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-07-25",
      "name": "Santiago Apóstol",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-07-28",
      "name": "Day of the Cantabrian Institutions",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de las Instituciones de Cantabria",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption",
      "type": "public",
      "impact": "medium",
      "localName": "Asunción"
    },
    {
      "date": "2027-09-08",
      "name": "Day of Asturias",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de Asturias",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-09-08",
      "name": "Day of Extremadura",
      "type": "regional",
      "impact": "medium",
      "localName": "Día de Extremadura",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-09-11",
      "name": "National Day of Catalonia",
      "type": "regional",
      "impact": "medium",
      "localName": "Diada Nacional de Catalunya",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-09-15",
      "name": "Feast of Our Lady of Bien Aparecida",
      "type": "regional",
      "impact": "medium",
      "localName": "Festividad de la Bien Aparecida",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-10-09",
      "name": "Day of the Valencian Community",
      "type": "regional",
      "impact": "medium",
      "localName": "Dia de la Comunitat Valenciana",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-10-12",
      "name": "National Day of Spain",
      "type": "public",
      "impact": "high",
      "localName": "Fiesta Nacional de España"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de todos los Santos"
    },
    {
      "date": "2027-12-06",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Constitución"
    },
    {
      "date": "2027-12-08",
      "name": "Immaculate Conception",
      "type": "public",
      "impact": "medium",
      "localName": "Inmaculada Concepción"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Feast of Saint Stephen",
      "description": "地区性公共假日，具体影响以当地安排为准"
    }
  ],
  "FI": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Uudenvuodenpäivä"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Loppiainen"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Pitkäperjantai"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Pääsiäispäivä"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Toinen pääsiäispäivä"
    },
    {
      "date": "2027-05-01",
      "name": "May Day",
      "type": "public",
      "impact": "medium",
      "localName": "Vappu"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Helatorstai"
    },
    {
      "date": "2027-05-16",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Helluntaipäivä"
    },
    {
      "date": "2027-06-25",
      "name": "Midsummer Eve",
      "type": "public",
      "impact": "medium",
      "localName": "Juhannusaatto"
    },
    {
      "date": "2027-06-26",
      "name": "Midsummer Day",
      "type": "public",
      "impact": "medium",
      "localName": "Juhannuspäivä"
    },
    {
      "date": "2027-11-06",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Pyhäinpäivä"
    },
    {
      "date": "2027-12-06",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Itsenäisyyspäivä"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Jouluaatto"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Joulupäivä"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Tapaninpäivä"
    }
  ],
  "FR": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Jour de l'an"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Lundi de Pâques"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête du Travail"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ascension"
    },
    {
      "date": "2027-05-08",
      "name": "Victory in Europe Day",
      "type": "public",
      "impact": "high",
      "localName": "Victoire 1945"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Lundi de Pentecôte"
    },
    {
      "date": "2027-07-14",
      "name": "Bastille Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête nationale"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Assomption"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Toussaint"
    },
    {
      "date": "2027-11-11",
      "name": "Armistice Day",
      "type": "public",
      "impact": "medium",
      "localName": "Armistice 1918"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Noël"
    }
  ],
  "GB": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-01-02",
      "name": "2 January",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-17",
      "name": "Saint Patrick's Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-03",
      "name": "Early May Bank Holiday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-31",
      "name": "Spring Bank Holiday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-07-12",
      "name": "Battle of the Boyne",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-08-02",
      "name": "Summer Bank Holiday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-08-30",
      "name": "Summer Bank Holiday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-11-30",
      "name": "Saint Andrew's Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-12-27",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-28",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "GD": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-02-07",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Indian Arrival Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-27",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-02",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-11",
      "name": "Carnival",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-10-25",
      "name": "Thanksgiving Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "GE": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "ახალი წელი"
    },
    {
      "date": "2027-01-02",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "ახალი წელი"
    },
    {
      "date": "2027-01-07",
      "name": "Christmas Day (Orthodox)",
      "type": "public",
      "impact": "high",
      "localName": "ქრისტეშობა"
    },
    {
      "date": "2027-01-19",
      "name": "Epiphany (Orthodox)",
      "type": "public",
      "impact": "medium",
      "localName": "ნათლისღება"
    },
    {
      "date": "2027-03-03",
      "name": "Mother's Day",
      "type": "public",
      "impact": "medium",
      "localName": "დედის დღე"
    },
    {
      "date": "2027-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high",
      "localName": "ქალთა საერთაშორისო დღე"
    },
    {
      "date": "2027-04-09",
      "name": "National Unity Day",
      "type": "public",
      "impact": "high",
      "localName": "ეროვნული ერთიანობის დღე"
    },
    {
      "date": "2027-04-30",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "ძველი პარასკევი"
    },
    {
      "date": "2027-05-01",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium",
      "localName": "დიდი შაბათი"
    },
    {
      "date": "2027-05-02",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "აღდგომის კვირა"
    },
    {
      "date": "2027-05-03",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "აღდგომის ორშაბათი"
    },
    {
      "date": "2027-05-09",
      "name": "Day of Victory over Fascism",
      "type": "public",
      "impact": "high",
      "localName": "ფაშიზმზე გამარჯვების დღე"
    },
    {
      "date": "2027-05-12",
      "name": "Saint Andrew the First-Called Day",
      "type": "public",
      "impact": "medium",
      "localName": "წმინდა მოციქულის ანდრია პირველწოდებულის საქართველოში შემოსვლის დღე"
    },
    {
      "date": "2027-05-26",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "დამოუკიდებლობის დღე"
    },
    {
      "date": "2027-08-28",
      "name": "Saint Mary's Day",
      "type": "public",
      "impact": "medium",
      "localName": "მარიამობა"
    },
    {
      "date": "2027-10-14",
      "name": "Day of Svetitskhoveli Cathedra",
      "type": "public",
      "impact": "medium",
      "localName": "სვეტიცხოვლობა"
    },
    {
      "date": "2027-11-23",
      "name": "Saint George's Day",
      "type": "public",
      "impact": "medium",
      "localName": "გიორგობა"
    }
  ],
  "GF": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Jour de l'An"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Lundi de Pâques"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête du Travail"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ascension"
    },
    {
      "date": "2027-05-08",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête de la Victoire 1945"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Lundi de Pentecôte"
    },
    {
      "date": "2027-06-10",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium",
      "localName": "Abolition de l'Esclavage"
    },
    {
      "date": "2027-07-14",
      "name": "National Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête Nationale"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Assomption"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Toussaint"
    },
    {
      "date": "2027-11-11",
      "name": "Armistice Day",
      "type": "public",
      "impact": "medium",
      "localName": "Armistice de 1918"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Noël"
    }
  ],
  "GH": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-07",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-06",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "May Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-07-01",
      "name": "Republic Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-09-21",
      "name": "Founders Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-03",
      "name": "Farmers' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "GL": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Ukiortaaq"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Kunngit pingasut ulluat"
    },
    {
      "date": "2027-03-25",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Sisamanngortoq illernartoq"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Tallimanngorneq tannaartoq"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Poorskip ullua"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Poorskip-aappaa"
    },
    {
      "date": "2027-04-23",
      "name": "General Prayer Day",
      "type": "public",
      "impact": "medium",
      "localName": "Tussiarfik"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Qilaliarfik"
    },
    {
      "date": "2027-05-07",
      "name": "Bank closing day",
      "type": "public",
      "impact": "medium",
      "localName": "Atuanngiffik"
    },
    {
      "date": "2027-05-16",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Piinsi"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Piinsip-aappaa"
    },
    {
      "date": "2027-06-21",
      "name": "Ullortuneq",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Juulliaraq"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Juullip ullua"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Juullip-aappaa"
    },
    {
      "date": "2027-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high",
      "localName": "Ukiutoqaq"
    }
  ],
  "GP": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Jour de l'An"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Lundi de Pâques"
    },
    {
      "date": "2027-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête du Travail"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ascension"
    },
    {
      "date": "2027-05-08",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête de la Victoire 1945"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Lundi de Pentecôte"
    },
    {
      "date": "2027-05-27",
      "name": "Abolition Day",
      "type": "public",
      "impact": "medium",
      "localName": "Abolition de l'Esclavage"
    },
    {
      "date": "2027-07-14",
      "name": "National Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête Nationale"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Assomption"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Toussaint"
    },
    {
      "date": "2027-11-11",
      "name": "Armistice Day",
      "type": "public",
      "impact": "medium",
      "localName": "Armistice"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Noël"
    }
  ],
  "GR": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Πρωτοχρονιά"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Θεοφάνεια"
    },
    {
      "date": "2027-03-15",
      "name": "Clean Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Καθαρά Δευτέρα"
    },
    {
      "date": "2027-03-25",
      "name": "Annunciation",
      "type": "public",
      "impact": "medium",
      "localName": "Ευαγγελισμός της Θεοτόκου"
    },
    {
      "date": "2027-03-25",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Εικοστή Πέμπτη Μαρτίου"
    },
    {
      "date": "2027-04-30",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Μεγάλη Παρασκευή"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Εργατική Πρωτομαγιά"
    },
    {
      "date": "2027-05-02",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Κυριακή του Πάσχα"
    },
    {
      "date": "2027-05-03",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Δευτέρα του Πάσχα"
    },
    {
      "date": "2027-06-20",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Πεντηκοστή"
    },
    {
      "date": "2027-06-21",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Δευτέρα Πεντηκοστής"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Κοίμηση της Θεοτόκου"
    },
    {
      "date": "2027-10-28",
      "name": "Ochi Day",
      "type": "public",
      "impact": "medium",
      "localName": "Το Όχι"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Χριστούγεννα"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Σύναξις Υπεραγίας Θεοτόκου Μαρίας"
    }
  ],
  "GT": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-25",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-27",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-06-30",
      "name": "Army Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-09-15",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-10-20",
      "name": "Revolution Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high"
    }
  ],
  "GY": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-02-23",
      "name": "Republic Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-05",
      "name": "Arrival Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-26",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-07-05",
      "name": "Caricom Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-01",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "HK": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "元旦新年"
    },
    {
      "date": "2027-02-06",
      "name": "Lunar New Year",
      "type": "public",
      "impact": "high",
      "localName": "農曆年初一"
    },
    {
      "date": "2027-02-08",
      "name": "Second day of Lunar New Year",
      "type": "public",
      "impact": "high",
      "localName": "農曆年初二"
    },
    {
      "date": "2027-02-09",
      "name": "Third day of Lunar New Year",
      "type": "public",
      "impact": "high",
      "localName": "農曆年初三"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "耶穌受難節"
    },
    {
      "date": "2027-03-27",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium",
      "localName": "耶穌受難節翌日"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "復活節星期一"
    },
    {
      "date": "2027-04-05",
      "name": "Ching Ming Festival",
      "type": "public",
      "impact": "medium",
      "localName": "清明節"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "勞動節"
    },
    {
      "date": "2027-05-13",
      "name": "Buddha's Birthday",
      "type": "public",
      "impact": "medium",
      "localName": "佛誕"
    },
    {
      "date": "2027-06-09",
      "name": "Dragon Boat Festival",
      "type": "public",
      "impact": "medium",
      "localName": "端午節"
    },
    {
      "date": "2027-07-01",
      "name": "Hong Kong Special Administrative Region Establishment Day",
      "type": "public",
      "impact": "medium",
      "localName": "香港特別行政區成立紀念日"
    },
    {
      "date": "2027-09-16",
      "name": "Day following the Mid-Autumn Festival",
      "type": "public",
      "impact": "medium",
      "localName": "中秋節翌日"
    },
    {
      "date": "2027-10-01",
      "name": "National Day",
      "type": "public",
      "impact": "high",
      "localName": "中華人民共和國國慶日"
    },
    {
      "date": "2027-10-08",
      "name": "Chung Yeung Festival",
      "type": "public",
      "impact": "medium",
      "localName": "重陽節"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "聖誕節"
    },
    {
      "date": "2027-12-27",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium",
      "localName": "聖誕節翌日"
    }
  ],
  "HN": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-25",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Holy Thursday"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-27",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-04-14",
      "name": "America's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-09-15",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-10-03",
      "name": "Francisco Morazán's Day/Soldier's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-10-12",
      "name": "Columbus Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-10-21",
      "name": "Army Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "HR": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nova Godina"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Bogojavljenje, Sveta tri kralja"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Uskrs i uskrsni ponedjeljak"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Uskrs i uskrsni ponedjeljak"
    },
    {
      "date": "2027-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "Međunarodni praznik rada"
    },
    {
      "date": "2027-05-27",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium",
      "localName": "Tijelovo"
    },
    {
      "date": "2027-05-30",
      "name": "National Day",
      "type": "public",
      "impact": "high",
      "localName": "Dan državnosti"
    },
    {
      "date": "2027-06-22",
      "name": "Anti-Fascist Struggle Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dan antifašističke borbe"
    },
    {
      "date": "2027-08-05",
      "name": "Victory and Homeland Thanksgiving Day and the Day of Croatian defenders",
      "type": "public",
      "impact": "high",
      "localName": "Dan pobjede i domovinske zahvalnosti i Dan hrvatskih branitelja"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Velika Gospa"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dan svih svetih"
    },
    {
      "date": "2027-11-18",
      "name": "Remembrance Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dan sjećanja na žrtve Domovinskog rata"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Božić"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Prvi dan po Božiću, Sveti Stjepan, Štefanje, Stipanje"
    }
  ],
  "HT": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Jour de l'an"
    },
    {
      "date": "2027-01-02",
      "name": "Ancestry Day",
      "type": "public",
      "impact": "medium",
      "localName": "Jour des Aieux"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Le Jour des Rois"
    },
    {
      "date": "2027-02-08",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2027-02-09",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2027-02-10",
      "name": "Ash Wednesday",
      "type": "public",
      "impact": "medium",
      "localName": "Mercredi Des Cendres"
    },
    {
      "date": "2027-03-25",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Jeudi saint"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Vendredi saint"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Pâques"
    },
    {
      "date": "2027-05-01",
      "name": "Labour and Agriculture Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête du Travail / Fête des Travailleurs"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ascension"
    },
    {
      "date": "2027-05-18",
      "name": "Flag and Universities Day",
      "type": "public",
      "impact": "medium",
      "localName": "Jour du Drapeau et de l'Université"
    },
    {
      "date": "2027-05-27",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium",
      "localName": "Fête-Dieu"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption of Mary",
      "type": "public",
      "impact": "medium",
      "localName": "L'Assomption de Marie"
    },
    {
      "date": "2027-10-17",
      "name": "Dessalines Day",
      "type": "public",
      "impact": "medium",
      "localName": "Anniversaire de la mort de Dessalines"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints Day",
      "type": "public",
      "impact": "medium",
      "localName": "La Toussaint"
    },
    {
      "date": "2027-11-02",
      "name": "All Souls' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Jour des Morts"
    },
    {
      "date": "2027-11-18",
      "name": "Battle of Vertières Day",
      "type": "public",
      "impact": "medium",
      "localName": "Vertières"
    },
    {
      "date": "2027-12-05",
      "name": "Discovery Day",
      "type": "public",
      "impact": "medium",
      "localName": "Découverte d'Haïti"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Noël"
    }
  ],
  "HU": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Újév"
    },
    {
      "date": "2027-03-15",
      "name": "1848 Revolution Memorial Day",
      "type": "public",
      "impact": "medium",
      "localName": "Nemzeti ünnep"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Nagypéntek"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Húsvétvasárnap"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Húsvéthétfő"
    },
    {
      "date": "2027-05-01",
      "name": "Labour day",
      "type": "public",
      "impact": "high",
      "localName": "A munka ünnepe"
    },
    {
      "date": "2027-05-16",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Pünkösdvasárnap"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Pünkösdhétfő"
    },
    {
      "date": "2027-08-20",
      "name": "State Foundation Day",
      "type": "public",
      "impact": "medium",
      "localName": "Az államalapítás ünnepe"
    },
    {
      "date": "2027-10-23",
      "name": "1956 Revolution Memorial Day",
      "type": "public",
      "impact": "medium",
      "localName": "Nemzeti ünnep"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints Day",
      "type": "public",
      "impact": "medium",
      "localName": "Mindenszentek"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Karácsony"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Karácsony másnapja"
    }
  ],
  "ID": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Tahun Baru Masehi"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Wafat Isa Almasih"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Paskah"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Hari Buruh Internasional"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Kenaikan Isa Almasih"
    },
    {
      "date": "2027-06-01",
      "name": "Pancasila Day",
      "type": "public",
      "impact": "medium",
      "localName": "Hari Lahir Pancasila"
    },
    {
      "date": "2027-08-17",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Hari Ulang Tahun Kemerdekaan Republik Indonesia"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Hari Raya Natal"
    }
  ],
  "IE": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Lá Caille"
    },
    {
      "date": "2027-02-01",
      "name": "Saint Brigid's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Lá Fhéile Bríde"
    },
    {
      "date": "2027-03-17",
      "name": "Saint Patrick's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Lá Fhéile Pádraig"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Aoine an Chéasta"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Luan Cásca"
    },
    {
      "date": "2027-05-03",
      "name": "May Day",
      "type": "public",
      "impact": "medium",
      "localName": "Lá Bealtaine"
    },
    {
      "date": "2027-06-07",
      "name": "June Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Lá Saoire i mí an Mheithimh"
    },
    {
      "date": "2027-08-02",
      "name": "August Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Lá Saoire i mí Lúnasa"
    },
    {
      "date": "2027-10-25",
      "name": "October Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Lá Saoire i mí Dheireadh Fómhair"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Lá Nollag"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Lá Fhéile Stiofáin"
    }
  ],
  "IS": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nýársdagur"
    },
    {
      "date": "2027-03-25",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Skírdagur"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Föstudagurinn langi"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Páskadagur"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Annar í páskum"
    },
    {
      "date": "2027-04-22",
      "name": "First Day of Summer",
      "type": "public",
      "impact": "medium",
      "localName": "Sumardagurinn fyrsti"
    },
    {
      "date": "2027-05-01",
      "name": "May Day",
      "type": "public",
      "impact": "medium",
      "localName": "Verkalýðsdagurinn"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Uppstigningardagur"
    },
    {
      "date": "2027-05-16",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Hvítasunnudagur"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Annar í hvítasunnu"
    },
    {
      "date": "2027-06-17",
      "name": "Icelandic National Day",
      "type": "public",
      "impact": "high",
      "localName": "Þjóðhátíðardagurinn"
    },
    {
      "date": "2027-08-02",
      "name": "Commerce Day",
      "type": "public",
      "impact": "high",
      "localName": "Frídagur verslunarmanna"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Aðfangadagur"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Jóladagur"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Annar í jólum"
    },
    {
      "date": "2027-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high",
      "localName": "Gamlársdagur"
    }
  ],
  "IT": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Capodanno"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Epifania"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Pasqua"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Lunedì dell'Angelo"
    },
    {
      "date": "2027-04-25",
      "name": "Liberation Day",
      "type": "public",
      "impact": "high",
      "localName": "Festa della Liberazione"
    },
    {
      "date": "2027-05-01",
      "name": "International Workers Day",
      "type": "public",
      "impact": "high",
      "localName": "Festa del Lavoro"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "regional",
      "impact": "medium",
      "localName": "Lunedì di Pentecoste",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-06-02",
      "name": "Republic Day",
      "type": "public",
      "impact": "high",
      "localName": "Festa della Repubblica"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ferragosto o Assunzione"
    },
    {
      "date": "2027-10-04",
      "name": "St. Francis of Assisi's Day",
      "type": "public",
      "impact": "medium",
      "localName": "San Francesco d'Assisi"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints Day",
      "type": "public",
      "impact": "medium",
      "localName": "Tutti i Santi"
    },
    {
      "date": "2027-12-08",
      "name": "Immaculate Conception",
      "type": "public",
      "impact": "medium",
      "localName": "Immacolata Concezione"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Natale"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Santo Stefano"
    }
  ],
  "JM": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-02-10",
      "name": "Ash Wednesday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-23",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-08-01",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-06",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-10-16",
      "name": "National Heroes Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "JP": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "元日"
    },
    {
      "date": "2027-01-11",
      "name": "Coming of Age Day",
      "type": "public",
      "impact": "medium",
      "localName": "成人の日"
    },
    {
      "date": "2027-02-11",
      "name": "Foundation Day",
      "type": "public",
      "impact": "medium",
      "localName": "建国記念の日"
    },
    {
      "date": "2027-02-23",
      "name": "The Emperor's Birthday",
      "type": "public",
      "impact": "medium",
      "localName": "天皇誕生日"
    },
    {
      "date": "2027-03-21",
      "name": "Vernal Equinox Day",
      "type": "public",
      "impact": "medium",
      "localName": "春分の日"
    },
    {
      "date": "2027-04-29",
      "name": "Shōwa Day",
      "type": "public",
      "impact": "medium",
      "localName": "昭和の日"
    },
    {
      "date": "2027-05-03",
      "name": "Constitution Memorial Day",
      "type": "public",
      "impact": "high",
      "localName": "憲法記念日"
    },
    {
      "date": "2027-05-04",
      "name": "Greenery Day",
      "type": "public",
      "impact": "medium",
      "localName": "みどりの日"
    },
    {
      "date": "2027-05-05",
      "name": "Children's Day",
      "type": "public",
      "impact": "medium",
      "localName": "こどもの日"
    },
    {
      "date": "2027-07-19",
      "name": "Marine Day",
      "type": "public",
      "impact": "medium",
      "localName": "海の日"
    },
    {
      "date": "2027-08-11",
      "name": "Mountain Day",
      "type": "public",
      "impact": "medium",
      "localName": "山の日"
    },
    {
      "date": "2027-09-20",
      "name": "Respect for the Aged Day",
      "type": "public",
      "impact": "medium",
      "localName": "敬老の日"
    },
    {
      "date": "2027-09-23",
      "name": "Autumnal Equinox Day",
      "type": "public",
      "impact": "medium",
      "localName": "秋分の日"
    },
    {
      "date": "2027-10-11",
      "name": "Sports Day",
      "type": "public",
      "impact": "medium",
      "localName": "スポーツの日"
    },
    {
      "date": "2027-11-03",
      "name": "Culture Day",
      "type": "public",
      "impact": "medium",
      "localName": "文化の日"
    },
    {
      "date": "2027-11-23",
      "name": "Labour Thanksgiving Day",
      "type": "public",
      "impact": "high",
      "localName": "勤労感謝の日"
    }
  ],
  "KE": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-06-01",
      "name": "Madaraka Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-10-11",
      "name": "Mazingira Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-10-20",
      "name": "Mashujaa Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-13",
      "name": "Jamhuri Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "KH": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "ទិវាបុណ្យចូលឆ្នាំសកល"
    },
    {
      "date": "2027-01-07",
      "name": "Victory over Genocide Day",
      "type": "public",
      "impact": "high",
      "localName": "ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍"
    },
    {
      "date": "2027-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high",
      "localName": "ទិវានារីអន្តរជាតិ"
    },
    {
      "date": "2027-04-14",
      "name": "Khmer New Year",
      "type": "public",
      "impact": "high",
      "localName": "ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ"
    },
    {
      "date": "2027-04-15",
      "name": "Khmer New Year",
      "type": "public",
      "impact": "high",
      "localName": "ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ"
    },
    {
      "date": "2027-04-16",
      "name": "Khmer New Year",
      "type": "public",
      "impact": "high",
      "localName": "ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "ទិវាពលកម្មអន្តរជាតិ"
    },
    {
      "date": "2027-05-14",
      "name": "King Sihamoni's Birthday",
      "type": "public",
      "impact": "medium",
      "localName": "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម ព្រះករុណា នរោត្តម សីហមុនី"
    },
    {
      "date": "2027-05-24",
      "name": "Royal Ploughing Ceremony",
      "type": "public",
      "impact": "medium",
      "localName": "ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល"
    },
    {
      "date": "2027-06-18",
      "name": "Queen Mother's Birthday",
      "type": "public",
      "impact": "medium",
      "localName": "ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម សម្តេចព្រះមហាក្សត្រី នរោត្តម មុនិនាថ សីហនុ"
    },
    {
      "date": "2027-09-24",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "ទិវាប្រកាសរដ្ឋធម្មនុញ្ញ"
    },
    {
      "date": "2027-09-29",
      "name": "Pchum Ben",
      "type": "public",
      "impact": "medium",
      "localName": "ពិធីបុណ្យភ្ផុំបិណ្ឌ"
    },
    {
      "date": "2027-09-30",
      "name": "Pchum Ben",
      "type": "public",
      "impact": "medium",
      "localName": "ពិធីបុណ្យភ្ផុំបិណ្ឌ"
    },
    {
      "date": "2027-10-01",
      "name": "Pchum Ben",
      "type": "public",
      "impact": "medium",
      "localName": "ពិធីបុណ្យភ្ផុំបិណ្ឌ"
    },
    {
      "date": "2027-10-15",
      "name": "Commemoration Day of the King's Father",
      "type": "public",
      "impact": "medium",
      "localName": "ព្រះរាជពិធីគោរពព្រះវិញ្ញាណក្ខន្ធព្រះករុណាព្រះបាទសម្ដេចព្រះ នរោត្ដម សីហនុ"
    },
    {
      "date": "2027-10-29",
      "name": "Coronation Day of King Sihamoni",
      "type": "public",
      "impact": "medium",
      "localName": "ព្រះរាជពិធីគ្រងព្រះបរមរាជសម្បត្តិរបស់ព្រះករុណាព្រះបាទសម្ដេចព្រះបរមនាថ នរោត្ដម សីហមុនី"
    },
    {
      "date": "2027-11-09",
      "name": "National Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "ទិវាបុណ្យឯករាជ្យជាតិ"
    },
    {
      "date": "2027-11-12",
      "name": "Water Festival",
      "type": "public",
      "impact": "medium",
      "localName": "ពិធីបុណ្យអុំទូក បណ្ដែតប្រទីប អកអំបុក និងសំពះព្រះខែ"
    },
    {
      "date": "2027-11-13",
      "name": "Water Festival",
      "type": "public",
      "impact": "medium",
      "localName": "ពិធីបុណ្យអុំទូក បណ្ដែតប្រទីប អកអំបុក និងសំពះព្រះខែ"
    },
    {
      "date": "2027-11-14",
      "name": "Water Festival",
      "type": "public",
      "impact": "medium",
      "localName": "ពិធីបុណ្យអុំទូក បណ្ដែតប្រទីប អកអំបុក និងសំពះព្រះខែ"
    },
    {
      "date": "2027-12-29",
      "name": "Cambodia Peace Day",
      "type": "public",
      "impact": "medium",
      "localName": "ទិវាសន្តិភាពនៅកម្ពុជា"
    }
  ],
  "KN": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-02",
      "name": "Carnival Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-01-28",
      "name": "Buckley's Uprising Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-03",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-02",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-03",
      "name": "Culturama Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-09-16",
      "name": "National Heroes' Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-09-19",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "KR": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "새해"
    },
    {
      "date": "2027-02-06",
      "name": "Lunar New Year",
      "type": "public",
      "impact": "high",
      "localName": "설날"
    },
    {
      "date": "2027-02-08",
      "name": "Lunar New Year",
      "type": "public",
      "impact": "high",
      "localName": "설날"
    },
    {
      "date": "2027-02-09",
      "name": "Lunar New Year",
      "type": "public",
      "impact": "high",
      "localName": "설날"
    },
    {
      "date": "2027-03-01",
      "name": "Independence Movement Day",
      "type": "public",
      "impact": "high",
      "localName": "3·1절"
    },
    {
      "date": "2027-05-03",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "노동절"
    },
    {
      "date": "2027-05-05",
      "name": "Children's Day",
      "type": "public",
      "impact": "medium",
      "localName": "어린이날"
    },
    {
      "date": "2027-05-13",
      "name": "Buddha's Birthday",
      "type": "public",
      "impact": "medium",
      "localName": "부처님 오신 날"
    },
    {
      "date": "2027-06-06",
      "name": "Memorial Day",
      "type": "public",
      "impact": "medium",
      "localName": "현충일"
    },
    {
      "date": "2027-07-19",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "제헌절"
    },
    {
      "date": "2027-08-16",
      "name": "Liberation Day",
      "type": "public",
      "impact": "high",
      "localName": "광복절"
    },
    {
      "date": "2027-09-14",
      "name": "Chuseok",
      "type": "public",
      "impact": "medium",
      "localName": "추석"
    },
    {
      "date": "2027-09-15",
      "name": "Chuseok",
      "type": "public",
      "impact": "medium",
      "localName": "추석"
    },
    {
      "date": "2027-09-16",
      "name": "Chuseok",
      "type": "public",
      "impact": "medium",
      "localName": "추석"
    },
    {
      "date": "2027-10-04",
      "name": "National Foundation Day",
      "type": "public",
      "impact": "high",
      "localName": "개천절"
    },
    {
      "date": "2027-10-11",
      "name": "Hangul Day",
      "type": "public",
      "impact": "medium",
      "localName": "한글날"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "크리스마스"
    }
  ],
  "KY": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-25",
      "name": "National Heroes Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-02-10",
      "name": "Ash Wednesday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-03",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-17",
      "name": "Discovery Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-07-05",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-11-08",
      "name": "Remembrance Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-27",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-28",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "KZ": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Жаңа жыл"
    },
    {
      "date": "2027-01-02",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Жаңа жыл"
    },
    {
      "date": "2027-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high",
      "localName": "Халықаралық әйелдер күні"
    },
    {
      "date": "2027-03-21",
      "name": "Nauryz Meyramy",
      "type": "public",
      "impact": "medium",
      "localName": "Наурыз мейрамы"
    },
    {
      "date": "2027-03-22",
      "name": "Nauryz Meyramy",
      "type": "public",
      "impact": "medium",
      "localName": "Наурыз мейрамы"
    },
    {
      "date": "2027-03-23",
      "name": "Nauryz Meyramy",
      "type": "public",
      "impact": "medium",
      "localName": "Наурыз мейрамы"
    },
    {
      "date": "2027-05-01",
      "name": "Kazakhstan People's Unity Day",
      "type": "public",
      "impact": "medium",
      "localName": "Қазақстан халқының"
    },
    {
      "date": "2027-05-07",
      "name": "Defender of the Fatherland Day",
      "type": "public",
      "impact": "medium",
      "localName": "Отан Қорғаушы күні"
    },
    {
      "date": "2027-05-09",
      "name": "Great Patriotic War Against Fascism Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Жеңіс күні"
    },
    {
      "date": "2027-07-06",
      "name": "Capital City Day",
      "type": "public",
      "impact": "medium",
      "localName": "Астана күні"
    },
    {
      "date": "2027-08-30",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Конституция күні"
    },
    {
      "date": "2027-10-25",
      "name": "Republic Day",
      "type": "public",
      "impact": "high",
      "localName": "Республика күні"
    },
    {
      "date": "2027-12-16",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Тәуелсіздік күні"
    }
  ],
  "LC": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-02-22",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "May Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-27",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-01",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-10-05",
      "name": "Thanksgiving",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-13",
      "name": "National day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "LT": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Naujieji metai"
    },
    {
      "date": "2027-02-16",
      "name": "The Day of Restoration of the State of Lithuania",
      "type": "public",
      "impact": "medium",
      "localName": "Lietuvos valstybės atkūrimo diena"
    },
    {
      "date": "2027-03-11",
      "name": "Day of Restoration of Independence of Lithuania",
      "type": "public",
      "impact": "high",
      "localName": "Lietuvos nepriklausomybės atkūrimo diena"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Velykos"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Antroji Velykų diena"
    },
    {
      "date": "2027-05-01",
      "name": "International Working Day",
      "type": "public",
      "impact": "high",
      "localName": "Tarptautinė darbo diena"
    },
    {
      "date": "2027-06-24",
      "name": "St. John's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Joninės, Rasos"
    },
    {
      "date": "2027-07-06",
      "name": "Statehood Day",
      "type": "public",
      "impact": "medium",
      "localName": "Valstybės diena"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Žolinė"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Visų šventųjų diena"
    },
    {
      "date": "2027-11-02",
      "name": "All Souls' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Vėlinės"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Šv. Kūčios"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Šv. Kalėdos"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Šv. Kalėdos"
    }
  ],
  "LU": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Neijoerschdag"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Karfreideg"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Ouschterméindeg"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Dag vun der Aarbecht"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Christi Himmelfaart"
    },
    {
      "date": "2027-05-09",
      "name": "Europe Day",
      "type": "public",
      "impact": "medium",
      "localName": "Europadag"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Péngschtméindeg"
    },
    {
      "date": "2027-06-23",
      "name": "Sovereign's birthday",
      "type": "public",
      "impact": "medium",
      "localName": "Groussherzogsgebuertsdag"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Léiffrawëschdag"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Allerhellgen"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Chrëschtdag"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Stiefesdag"
    }
  ],
  "LV": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Jaungada diena"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Lielā Piektdiena"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Pirmās Lieldienas"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Otrās Lieldienas"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Darba svētki"
    },
    {
      "date": "2027-05-01",
      "name": "Day of the Convocation of the Constitutional Assembly of the Republic of Latvia",
      "type": "public",
      "impact": "high",
      "localName": "Latvijas Republikas Satversmes sapulces sasaukšanas diena"
    },
    {
      "date": "2027-05-04",
      "name": "Day of the Restoration of Independence of the Republic of Latvia",
      "type": "public",
      "impact": "high",
      "localName": "Latvijas Republikas Neatkarības atjaunošanas diena"
    },
    {
      "date": "2027-05-09",
      "name": "Mother's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Mātes diena"
    },
    {
      "date": "2027-05-16",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Vasarsvētki"
    },
    {
      "date": "2027-06-23",
      "name": "Līgo Day",
      "type": "public",
      "impact": "medium",
      "localName": "Līgo diena"
    },
    {
      "date": "2027-06-24",
      "name": "Jāņi Day",
      "type": "public",
      "impact": "medium",
      "localName": "Jāņu diena"
    },
    {
      "date": "2027-11-18",
      "name": "Day of the Proclamation of the Republic of Latvia",
      "type": "public",
      "impact": "high",
      "localName": "Latvijas Republikas Proklamēšanas diena"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Ziemassvētku vakars"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Pirmie Ziemassvētki"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Otrie Ziemassvētki"
    },
    {
      "date": "2027-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high",
      "localName": "Vecgada diena"
    }
  ],
  "MA": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Ras l' âm"
    },
    {
      "date": "2027-01-11",
      "name": "Proclamation of Independence",
      "type": "public",
      "impact": "high",
      "localName": "Takdim watikat al-istiqlal"
    },
    {
      "date": "2027-01-14",
      "name": "Amazigh New Year",
      "type": "public",
      "impact": "high",
      "localName": "Id Yennayer"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Eid Ash-Shughl"
    },
    {
      "date": "2027-07-30",
      "name": "Enthronement",
      "type": "public",
      "impact": "high",
      "localName": "Eid Al-Ârch"
    },
    {
      "date": "2027-08-14",
      "name": "Zikra Oued Ed-Dahab",
      "type": "public",
      "impact": "medium",
      "localName": "Oued Ed-Dahab Day"
    },
    {
      "date": "2027-08-20",
      "name": "Revolution of the King and the People",
      "type": "public",
      "impact": "medium",
      "localName": "Thawrat al malik wa shâab"
    },
    {
      "date": "2027-08-21",
      "name": "Youth Day",
      "type": "public",
      "impact": "high",
      "localName": "Eid Al Chabab"
    },
    {
      "date": "2027-11-06",
      "name": "Green March",
      "type": "public",
      "impact": "high",
      "localName": "Eid Al Massira Al Khadra"
    },
    {
      "date": "2027-11-18",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Eid Al Istiqulal"
    }
  ],
  "MG": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Martyrs' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-26",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "MN": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Шинэ жил (Shine jil)"
    },
    {
      "date": "2027-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high",
      "localName": "Олон Улсын Эмэгтэйчүүдийн Баяр"
    },
    {
      "date": "2027-06-01",
      "name": "Naadam Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Наадам"
    },
    {
      "date": "2027-07-11",
      "name": "Naadam Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Наадам"
    },
    {
      "date": "2027-07-12",
      "name": "Naadam Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Наадам"
    },
    {
      "date": "2027-07-13",
      "name": "Naadam Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Наадам"
    },
    {
      "date": "2027-07-14",
      "name": "Naadam Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Наадам"
    },
    {
      "date": "2027-07-15",
      "name": "Naadam Holiday",
      "type": "public",
      "impact": "medium",
      "localName": "Наадам"
    },
    {
      "date": "2027-11-26",
      "name": "Republic Day",
      "type": "public",
      "impact": "high",
      "localName": "Улс тунхагласны өдөр"
    },
    {
      "date": "2027-12-29",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Тусгаар Тогтнолын Өдөр"
    }
  ],
  "MQ": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Jour de l'An"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Lundi de Pâques"
    },
    {
      "date": "2027-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête du Travail"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ascension"
    },
    {
      "date": "2027-05-08",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête de la Victoire 1945"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Lundi de Pentecôte"
    },
    {
      "date": "2027-05-22",
      "name": "Abolition Day",
      "type": "public",
      "impact": "medium",
      "localName": "Abolition de l'Esclavage"
    },
    {
      "date": "2027-07-14",
      "name": "National Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête Nationale"
    },
    {
      "date": "2027-07-21",
      "name": "Schoelcher Day",
      "type": "public",
      "impact": "medium",
      "localName": "Fête Victor Schœlcher"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Assomption"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Toussaint"
    },
    {
      "date": "2027-11-11",
      "name": "Armistice Day",
      "type": "public",
      "impact": "medium",
      "localName": "Armistice"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Noël"
    }
  ],
  "MT": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "L-Ewwel tas-Sena"
    },
    {
      "date": "2027-02-10",
      "name": "Feast of St. Paul's Shipwreck",
      "type": "public",
      "impact": "medium",
      "localName": "In-Nawfraġju ta’ San Pawl"
    },
    {
      "date": "2027-03-19",
      "name": "Feast of St. Joseph",
      "type": "public",
      "impact": "medium",
      "localName": "San Ġużepp"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Il-Ġimgħa l-Kbira"
    },
    {
      "date": "2027-03-31",
      "name": "Freedom Day",
      "type": "public",
      "impact": "medium",
      "localName": "Jum il-Ħelsien"
    },
    {
      "date": "2027-05-01",
      "name": "Worker's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Jum il-Ħaddiem"
    },
    {
      "date": "2027-06-07",
      "name": "Sette Giugno",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-29",
      "name": "Feast of St.Peter and St.Paul",
      "type": "public",
      "impact": "medium",
      "localName": "L-Imnarja"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Santa Marija"
    },
    {
      "date": "2027-09-08",
      "name": "Feast of Our Lady of Victories",
      "type": "public",
      "impact": "medium",
      "localName": "Il-Vittorja"
    },
    {
      "date": "2027-09-21",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "L-Indipendenza"
    },
    {
      "date": "2027-12-08",
      "name": "Feast of the Immaculate Conception",
      "type": "public",
      "impact": "medium",
      "localName": "L-Immakulata Kunċizzjoni"
    },
    {
      "date": "2027-12-13",
      "name": "Republic Day",
      "type": "public",
      "impact": "high",
      "localName": "Jum ir-Repubblika"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Il-Milied"
    }
  ],
  "MX": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2027-02-01",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Constitución"
    },
    {
      "date": "2027-03-15",
      "name": "Benito Juárez's birthday",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio de Benito Juárez"
    },
    {
      "date": "2027-03-25",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Jueves Santo"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2027-04-30",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día del Trabajo"
    },
    {
      "date": "2027-09-16",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia"
    },
    {
      "date": "2027-11-15",
      "name": "Revolution Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Revolución"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "MZ": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia de Ano Novo"
    },
    {
      "date": "2027-02-03",
      "name": "Heroes's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia do Heroi Nacional"
    },
    {
      "date": "2027-04-07",
      "name": "Women's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia da Mulher"
    },
    {
      "date": "2027-05-01",
      "name": "Worker's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia do Trabalhador"
    },
    {
      "date": "2027-06-25",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia da Independência"
    },
    {
      "date": "2027-09-07",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia da Victória"
    },
    {
      "date": "2027-09-25",
      "name": "Revolution Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia da Revolução"
    },
    {
      "date": "2027-10-04",
      "name": "Day of Peace and Reconciliation",
      "type": "public",
      "impact": "medium",
      "localName": "Dia da Paz e da Reconcialição"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Natal"
    }
  ],
  "NA": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-21",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Workers' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-04",
      "name": "Cassinga Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-25",
      "name": "Africa Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-28",
      "name": "Genocide Remembrance Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-26",
      "name": "Heroes' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-10",
      "name": "Human Rights Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "Day of Goodwill",
      "type": "public",
      "impact": "medium",
      "localName": "St. Stephen's Day"
    }
  ],
  "NE": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-04-24",
      "name": "Concord Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-08-03",
      "name": "Nigerien Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-18",
      "name": "Nigerien Republic Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "NG": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-03",
      "name": "Workers' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-27",
      "name": "Children's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-12",
      "name": "Democracy Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-10-01",
      "name": "National Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-11-01",
      "name": "National Youth Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-27",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-27",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "NI": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-02-01",
      "name": "Air Force Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-04-01",
      "name": "Holy Thursday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-27",
      "name": "Army Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-07-19",
      "name": "Liberation Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-09-14",
      "name": "Battle of San Jacinto",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-09-15",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-10-12",
      "name": "Indigenous Resistance Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-08",
      "name": "Immaculate Conception",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high"
    }
  ],
  "NL": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nieuwjaarsdag"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Goede Vrijdag"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Eerste Paasdag"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Tweede Paasdag"
    },
    {
      "date": "2027-04-27",
      "name": "King's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Koningsdag"
    },
    {
      "date": "2027-05-05",
      "name": "Liberation Day",
      "type": "public",
      "impact": "high",
      "localName": "Bevrijdingsdag"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Hemelvaartsdag"
    },
    {
      "date": "2027-05-16",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Eerste Pinksterdag"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Tweede Pinksterdag"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Eerste Kerstdag"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Tweede Kerstdag"
    }
  ],
  "NO": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Første nyttårsdag"
    },
    {
      "date": "2027-03-25",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Skjærtorsdag"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Langfredag"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Første påskedag"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Andre påskedag"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Første mai"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Kristi himmelfartsdag"
    },
    {
      "date": "2027-05-16",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Første pinsedag"
    },
    {
      "date": "2027-05-17",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Syttende mai"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Andre pinsedag"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Første juledag"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Andre juledag"
    }
  ],
  "NZ": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-04",
      "name": "Day after New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-25",
      "name": "Wellington Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-02-01",
      "name": "Auckland Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Auckland/Northland Anniversary Day",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-02-01",
      "name": "Nelson Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-02-08",
      "name": "Waitangi Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-08",
      "name": "Taranaki Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-22",
      "name": "Otago Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-30",
      "name": "Southland Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-04-26",
      "name": "Anzac Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-07",
      "name": "King's Birthday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-25",
      "name": "Matariki",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-09-27",
      "name": "Canterbury (South) Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Dominion Day",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-10-22",
      "name": "Hawke's Bay Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-10-25",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-11-01",
      "name": "Marlborough Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-11-12",
      "name": "Canterbury Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Canterbury (North & Central) Anniversary Day",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-11-29",
      "name": "Chatham Islands Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-11-29",
      "name": "Westland Anniversary Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-12-27",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-28",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "PA": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-09",
      "name": "Martyr's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-02-08",
      "name": "Carnival",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-02-09",
      "name": "Carnival",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-11-03",
      "name": "Separation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-11-04",
      "name": "Flag Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-11-05",
      "name": "Colon Day",
      "type": "public",
      "impact": "medium",
      "localName": "Colón Day"
    },
    {
      "date": "2027-11-10",
      "name": "Shout in Villa de los Santos",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-11-28",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-08",
      "name": "Mother's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "PE": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2027-03-25",
      "name": "Holy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Jueves Santo"
    },
    {
      "date": "2027-03-25",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Jueves Santo"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Domingo Santo"
    },
    {
      "date": "2027-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "Día del Trabajo"
    },
    {
      "date": "2027-06-29",
      "name": "Saint Peter and Saint Paul",
      "type": "public",
      "impact": "medium",
      "localName": "Día de San Pedro y San Pablo"
    },
    {
      "date": "2027-07-28",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia"
    },
    {
      "date": "2027-07-29",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia"
    },
    {
      "date": "2027-08-30",
      "name": "Santa Rosa de Lima",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Santa Rosa de Lima"
    },
    {
      "date": "2027-10-08",
      "name": "Battle of Angamos",
      "type": "public",
      "impact": "medium",
      "localName": "Combate de Angamos"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Todos los Santos"
    },
    {
      "date": "2027-12-08",
      "name": "Immaculate Conception",
      "type": "public",
      "impact": "medium",
      "localName": "Inmaculada Concepción"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "PG": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-27",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-06-14",
      "name": "Queen's Birthday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-07-23",
      "name": "Remembrance Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-26",
      "name": "Repentance Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-09-16",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium",
      "localName": "St. Stephen's Day"
    }
  ],
  "PH": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Bagong Taon"
    },
    {
      "date": "2027-02-06",
      "name": "Chinese New Year",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-25",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Huwebes Santo"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Biyernes Santo"
    },
    {
      "date": "2027-03-27",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium",
      "localName": "Sabado de Gloria"
    },
    {
      "date": "2027-04-09",
      "name": "Day of Valor",
      "type": "public",
      "impact": "medium",
      "localName": "Araw ng Kagitingan"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Araw ng Paggawa"
    },
    {
      "date": "2027-06-12",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Araw ng Kalayaan"
    },
    {
      "date": "2027-08-21",
      "name": "Ninoy Aquino Day",
      "type": "public",
      "impact": "medium",
      "localName": "Araw ng Kamatayan ni Senador Benigno Simeon \"Ninoy\" Aquino Jr."
    },
    {
      "date": "2027-08-30",
      "name": "National Heroes Day",
      "type": "public",
      "impact": "high",
      "localName": "Araw ng mga Bayani"
    },
    {
      "date": "2027-10-31",
      "name": "All Saints' Day Eve",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Araw ng mga Santo"
    },
    {
      "date": "2027-11-30",
      "name": "Bonifacio Day",
      "type": "public",
      "impact": "medium",
      "localName": "Araw ni Gat Andres Bonifacio"
    },
    {
      "date": "2027-12-08",
      "name": "Feast of the Immaculate Conception of Mary",
      "type": "public",
      "impact": "medium",
      "localName": "Kapistahan ng Immaculada Concepcion"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Araw ng Pasko"
    },
    {
      "date": "2027-12-30",
      "name": "Rizal Day",
      "type": "public",
      "impact": "medium",
      "localName": "Araw ng Kamatayan ni Dr. Jose Rizal"
    },
    {
      "date": "2027-12-31",
      "name": "Last Day of The Year",
      "type": "public",
      "impact": "medium",
      "localName": "Huling Araw ng Taon"
    }
  ],
  "PL": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nowy Rok"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Święto Trzech Króli"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Wielkanoc"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Drugi Dzień Wielkanocy"
    },
    {
      "date": "2027-05-01",
      "name": "May Day",
      "type": "public",
      "impact": "medium",
      "localName": "Święto Pracy"
    },
    {
      "date": "2027-05-03",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Święto Konstytucji 3 Maja"
    },
    {
      "date": "2027-05-16",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Zielone Świątki"
    },
    {
      "date": "2027-05-27",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium",
      "localName": "Boże Ciało"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Wniebowzięcie Najświętszej Maryi Panny"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Wszystkich Świętych"
    },
    {
      "date": "2027-11-11",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Narodowe Święto Niepodległości"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Wigilia Bożego Narodzenia"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Boże Narodzenie"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Drugi Dzień Bożego Narodzenia"
    }
  ],
  "PM": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Jour de l'An"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Lundi de Pâques"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête du Travail"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ascension"
    },
    {
      "date": "2027-05-08",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Fête de la Victoire 1945"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Lundi de Pentecôte"
    },
    {
      "date": "2027-07-14",
      "name": "National Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Assomption"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Toussaint"
    },
    {
      "date": "2027-11-11",
      "name": "Armistice Day",
      "type": "public",
      "impact": "medium",
      "localName": "Armistice"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Noël"
    }
  ],
  "PR": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de Año Nuevo"
    },
    {
      "date": "2027-01-06",
      "name": "Three Kings Day / Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Reyes"
    },
    {
      "date": "2027-01-11",
      "name": "Birthday of Eugenio María de Hostos",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio de Eugenio María de Hostos"
    },
    {
      "date": "2027-01-18",
      "name": "Martin Luther King, Jr. Day",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio de Martin Luther King, Jr."
    },
    {
      "date": "2027-02-15",
      "name": "Presidents' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de los Presidentes"
    },
    {
      "date": "2027-02-18",
      "name": "Birthday of Luis Muñoz Marín",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio de Luis Muñoz Marín"
    },
    {
      "date": "2027-03-22",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Abolición de Esclavitud"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2027-04-19",
      "name": "Birthday of José de Diego",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio de José de Diego"
    },
    {
      "date": "2027-05-31",
      "name": "Memorial Day",
      "type": "public",
      "impact": "medium",
      "localName": "Recordación de los Muertos de la Guerra"
    },
    {
      "date": "2027-07-05",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia de los Estados Unidos"
    },
    {
      "date": "2027-07-19",
      "name": "Birthday of Don Luis Muñoz Rivera",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio de Don Luis Muñoz Rivera"
    },
    {
      "date": "2027-07-25",
      "name": "Puerto Rico Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Constitución de Puerto Rico"
    },
    {
      "date": "2027-07-27",
      "name": "Birthday of Dr. José Celso Barbosa",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio de Dr. José Celso Barbosa"
    },
    {
      "date": "2027-09-06",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día del Trabajo"
    },
    {
      "date": "2027-10-11",
      "name": "Columbus Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Raza / Descubrimiento de América"
    },
    {
      "date": "2027-11-11",
      "name": "Veterans Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día del Veterano / Día del Armisticio"
    },
    {
      "date": "2027-11-19",
      "name": "Discovery of Puerto Rico",
      "type": "public",
      "impact": "medium",
      "localName": "Día del Descubrimiento de Puerto Rico"
    },
    {
      "date": "2027-11-25",
      "name": "Thanksgiving Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de Acción de Gracias"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Noche Buena"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    }
  ],
  "PT": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Ano Novo"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Sexta-feira Santa"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Domingo de Páscoa"
    },
    {
      "date": "2027-04-25",
      "name": "Freedom Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia da Liberdade"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia do Trabalhador"
    },
    {
      "date": "2027-05-27",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium",
      "localName": "Corpo de Deus"
    },
    {
      "date": "2027-06-01",
      "name": "Azores Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Dia dos Açores",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-06-10",
      "name": "National Day",
      "type": "public",
      "impact": "high",
      "localName": "Dia de Portugal, de Camões e das Comunidades Portuguesas"
    },
    {
      "date": "2027-07-01",
      "name": "Madeira Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Dia da Madeira",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Assunção de Nossa Senhora"
    },
    {
      "date": "2027-10-05",
      "name": "Republic Day",
      "type": "public",
      "impact": "high",
      "localName": "Implantação da República"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints Day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de Todos-os-Santos"
    },
    {
      "date": "2027-12-01",
      "name": "Restoration of Independence",
      "type": "public",
      "impact": "high",
      "localName": "Restauração da Independência"
    },
    {
      "date": "2027-12-08",
      "name": "Immaculate Conception",
      "type": "public",
      "impact": "medium",
      "localName": "Imaculada Conceição"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Natal"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "regional",
      "impact": "medium",
      "localName": "Primeira Oitava",
      "description": "地区性公共假日，具体影响以当地安排为准"
    }
  ],
  "PY": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-01",
      "name": "Heroes' day",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de los héroes"
    },
    {
      "date": "2027-03-25",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Jueves Santo"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Viernes Santo"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de los Trabajadores"
    },
    {
      "date": "2027-05-14",
      "name": "Paraguayan Independence",
      "type": "public",
      "impact": "high",
      "localName": "Independencia"
    },
    {
      "date": "2027-05-15",
      "name": "Paraguayan Independence",
      "type": "public",
      "impact": "high",
      "localName": "Independencia"
    },
    {
      "date": "2027-06-12",
      "name": "Chaco Armistice",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de la Paz del Chaco"
    },
    {
      "date": "2027-08-15",
      "name": "Founding of Asunción",
      "type": "public",
      "impact": "medium",
      "localName": "Fundación de Asunción"
    },
    {
      "date": "2027-09-29",
      "name": "Boqueron Battle Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Victoria de Boquerón"
    },
    {
      "date": "2027-12-08",
      "name": "Virgin of Caacupe",
      "type": "public",
      "impact": "medium",
      "localName": "Virgen de Caacupé"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de Navidad"
    }
  ],
  "RO": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Anul Nou"
    },
    {
      "date": "2027-01-02",
      "name": "Day after New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Anul Nou"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Bobotează"
    },
    {
      "date": "2027-01-07",
      "name": "Saint John the Baptist",
      "type": "public",
      "impact": "medium",
      "localName": "Sfântul Ion"
    },
    {
      "date": "2027-01-24",
      "name": "Union Day/Small Union",
      "type": "public",
      "impact": "medium",
      "localName": "Unirea Principatelor Române/Mica Unire"
    },
    {
      "date": "2027-04-30",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Vinerea mare"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Ziua Muncii"
    },
    {
      "date": "2027-05-02",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Paștele"
    },
    {
      "date": "2027-05-03",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Paștele"
    },
    {
      "date": "2027-06-01",
      "name": "Children's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ziua Copilului"
    },
    {
      "date": "2027-06-20",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Rusaliile"
    },
    {
      "date": "2027-06-21",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium",
      "localName": "Rusaliile"
    },
    {
      "date": "2027-08-15",
      "name": "Dormition of the Theotokos",
      "type": "public",
      "impact": "medium",
      "localName": "Adormirea Maicii Domnului/Sfânta Maria Mare"
    },
    {
      "date": "2027-11-30",
      "name": "St. Andrew's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Sfântul Andrei"
    },
    {
      "date": "2027-12-01",
      "name": "National Day/Great Union",
      "type": "public",
      "impact": "high",
      "localName": "Ziua Națională/Marea Unire"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Crăciunul"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Crăciunul"
    }
  ],
  "RU": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Новый год"
    },
    {
      "date": "2027-01-02",
      "name": "New Year holiday",
      "type": "public",
      "impact": "high",
      "localName": "Новогодние каникулы"
    },
    {
      "date": "2027-01-03",
      "name": "New Year holiday",
      "type": "public",
      "impact": "high",
      "localName": "Новогодние каникулы"
    },
    {
      "date": "2027-01-04",
      "name": "New Year holiday",
      "type": "public",
      "impact": "high",
      "localName": "Новогодние каникулы"
    },
    {
      "date": "2027-01-05",
      "name": "New Year holiday",
      "type": "public",
      "impact": "high",
      "localName": "Новогодние каникулы"
    },
    {
      "date": "2027-01-06",
      "name": "New Year holiday",
      "type": "public",
      "impact": "high",
      "localName": "Новогодние каникулы"
    },
    {
      "date": "2027-01-07",
      "name": "Christmas Day (Orthodox)",
      "type": "public",
      "impact": "high",
      "localName": "Рождество Христово"
    },
    {
      "date": "2027-02-23",
      "name": "Defender of the Fatherland Day",
      "type": "public",
      "impact": "medium",
      "localName": "День защитника Отечества"
    },
    {
      "date": "2027-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high",
      "localName": "Международный женский день"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "День труда"
    },
    {
      "date": "2027-05-09",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "День Победы"
    },
    {
      "date": "2027-06-12",
      "name": "Russia Day",
      "type": "public",
      "impact": "medium",
      "localName": "День России"
    },
    {
      "date": "2027-11-04",
      "name": "Unity Day",
      "type": "public",
      "impact": "medium",
      "localName": "День народного единства"
    }
  ],
  "SC": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-02",
      "name": "New Year Holiday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-27",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "high",
      "localName": "Easter Saturday"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-27",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium",
      "localName": "The Fete Dieu"
    },
    {
      "date": "2027-06-18",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "National Day"
    },
    {
      "date": "2027-06-29",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Assumption of Mary"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-08",
      "name": "The Feast of the Immaculate Conception",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "SE": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nyårsdagen"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Trettondedag jul"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Långfredagen"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Påskdagen"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Annandag påsk"
    },
    {
      "date": "2027-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "Första maj"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Kristi himmelsfärdsdag"
    },
    {
      "date": "2027-05-16",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Pingstdagen"
    },
    {
      "date": "2027-06-06",
      "name": "National Day of Sweden",
      "type": "public",
      "impact": "high",
      "localName": "Sveriges nationaldag"
    },
    {
      "date": "2027-06-25",
      "name": "Midsummer Eve",
      "type": "public",
      "impact": "medium",
      "localName": "Midsommarafton"
    },
    {
      "date": "2027-06-26",
      "name": "Midsummer Day",
      "type": "public",
      "impact": "medium",
      "localName": "Midsommardagen"
    },
    {
      "date": "2027-11-06",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Alla helgons dag"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Julafton"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Juldagen"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Annandag jul"
    },
    {
      "date": "2027-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high",
      "localName": "Nyårsafton"
    }
  ],
  "SG": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-02-06",
      "name": "Chinese New Year",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-02-08",
      "name": "Chinese New Year",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-10",
      "name": "Hari Raya Puasa",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-17",
      "name": "Hari Raya Haji",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-20",
      "name": "Vesak Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-08-09",
      "name": "National Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-10-28",
      "name": "Deepavali",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "SI": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "novo leto"
    },
    {
      "date": "2027-01-02",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "novo leto"
    },
    {
      "date": "2027-02-08",
      "name": "Prešeren Day",
      "type": "public",
      "impact": "medium",
      "localName": "Prešernov dan"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "velikonočna nedelja in ponedeljek"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "velikonočna nedelja in ponedeljek"
    },
    {
      "date": "2027-04-27",
      "name": "Day of Uprising Against Occupation",
      "type": "public",
      "impact": "medium",
      "localName": "dan upora proti okupatorju"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "praznik dela"
    },
    {
      "date": "2027-05-02",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "praznik dela"
    },
    {
      "date": "2027-05-16",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "binkoštna nedelja"
    },
    {
      "date": "2027-06-25",
      "name": "Statehood Day",
      "type": "public",
      "impact": "medium",
      "localName": "dan državnosti"
    },
    {
      "date": "2027-08-15",
      "name": "Assumption Day",
      "type": "public",
      "impact": "medium",
      "localName": "Marijino vnebovzetje"
    },
    {
      "date": "2027-10-31",
      "name": "Reformation Day",
      "type": "public",
      "impact": "medium",
      "localName": "dan reformacije"
    },
    {
      "date": "2027-11-01",
      "name": "Day of the Dead",
      "type": "public",
      "impact": "medium",
      "localName": "dan spomina na mrtve"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "božič"
    },
    {
      "date": "2027-12-26",
      "name": "Independence and Unity Day",
      "type": "public",
      "impact": "high",
      "localName": "dan samostojnosti in enotnosti"
    }
  ],
  "SK": [
    {
      "date": "2027-01-01",
      "name": "Day of the Establishment of the Slovak Republic",
      "type": "public",
      "impact": "high",
      "localName": "Deň vzniku Slovenskej republiky"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Zjavenie Pána"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Veľkonočný piatok"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high",
      "localName": "Veľkonočný pondelok"
    },
    {
      "date": "2027-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "Sviatok práce"
    },
    {
      "date": "2027-05-08",
      "name": "Day of victory over fascism",
      "type": "public",
      "impact": "high",
      "localName": "Deň víťazstva nad fašizmom"
    },
    {
      "date": "2027-07-05",
      "name": "St. Cyril and Methodius Day",
      "type": "public",
      "impact": "medium",
      "localName": "Sviatok svätého Cyrila a svätého Metoda"
    },
    {
      "date": "2027-08-29",
      "name": "Slovak National Uprising anniversary",
      "type": "public",
      "impact": "high",
      "localName": "Výročie Slovenského národného povstania"
    },
    {
      "date": "2027-09-15",
      "name": "Day of Our Lady of the Seven Sorrows",
      "type": "public",
      "impact": "medium",
      "localName": "Sedembolestná Panna Mária"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints’ Day",
      "type": "public",
      "impact": "medium",
      "localName": "Sviatok Všetkých svätých"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Štedrý deň"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Prvý sviatok vianočný"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Druhý sviatok vianočný"
    }
  ],
  "SR": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-06",
      "name": "Three Kings Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-01-17",
      "name": "World Religion Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-02-06",
      "name": "Chinese New Year",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-02-25",
      "name": "Day of the Revolution",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-05",
      "name": "Indian Arrival Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-07-01",
      "name": "Keti Koti",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-08",
      "name": "Javanese Arrival Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-09",
      "name": "Indigenous People's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-10-10",
      "name": "Day of the Maroons",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-10-20",
      "name": "Chinese Arrival day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-11-25",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "SV": [
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día del Trabajo"
    },
    {
      "date": "2027-05-03",
      "name": "The Day of the Cross",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Cru"
    },
    {
      "date": "2027-05-07",
      "name": "Soldiers' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día del Soldado"
    },
    {
      "date": "2027-05-10",
      "name": "Mother's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de las Madres"
    },
    {
      "date": "2027-05-10",
      "name": "Father's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día del Padre"
    },
    {
      "date": "2027-08-01",
      "name": "August Festivals",
      "type": "public",
      "impact": "medium",
      "localName": "Fiestas de agosto"
    },
    {
      "date": "2027-08-02",
      "name": "August Festivals",
      "type": "public",
      "impact": "medium",
      "localName": "Fiestas de agosto"
    },
    {
      "date": "2027-08-03",
      "name": "August Festivals",
      "type": "public",
      "impact": "medium",
      "localName": "Fiestas de agosto"
    },
    {
      "date": "2027-08-04",
      "name": "August Festivals",
      "type": "public",
      "impact": "medium",
      "localName": "Fiestas de agosto"
    },
    {
      "date": "2027-08-05",
      "name": "August Festivals",
      "type": "public",
      "impact": "medium",
      "localName": "Fiestas de agosto"
    },
    {
      "date": "2027-08-06",
      "name": "August Festivals",
      "type": "public",
      "impact": "medium",
      "localName": "Fiestas de agosto"
    },
    {
      "date": "2027-08-07",
      "name": "August Festivals",
      "type": "public",
      "impact": "medium",
      "localName": "Fiestas de agosto"
    },
    {
      "date": "2027-09-15",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia"
    },
    {
      "date": "2027-10-01",
      "name": "Children's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día del niño"
    },
    {
      "date": "2027-10-12",
      "name": "Ethnic Pride Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la raza"
    },
    {
      "date": "2027-11-02",
      "name": "Day of the Dead",
      "type": "public",
      "impact": "medium",
      "localName": "El día de los difuntos"
    },
    {
      "date": "2027-11-07",
      "name": "National Pupusa Festival",
      "type": "public",
      "impact": "high",
      "localName": "Festival Nacional De La Pupusa"
    },
    {
      "date": "2027-11-08",
      "name": "National Pupusa Festival",
      "type": "public",
      "impact": "high",
      "localName": "Festival Nacional De La Pupusa"
    },
    {
      "date": "2027-11-09",
      "name": "National Pupusa Festival",
      "type": "public",
      "impact": "high",
      "localName": "Festival Nacional De La Pupusa"
    },
    {
      "date": "2027-11-10",
      "name": "National Pupusa Festival",
      "type": "public",
      "impact": "high",
      "localName": "Festival Nacional De La Pupusa"
    },
    {
      "date": "2027-11-11",
      "name": "National Pupusa Festival",
      "type": "public",
      "impact": "high",
      "localName": "Festival Nacional De La Pupusa"
    },
    {
      "date": "2027-11-12",
      "name": "National Pupusa Festival",
      "type": "public",
      "impact": "high",
      "localName": "Festival Nacional De La Pupusa"
    },
    {
      "date": "2027-11-13",
      "name": "National Pupusa Festival",
      "type": "public",
      "impact": "high",
      "localName": "Festival Nacional De La Pupusa"
    },
    {
      "date": "2027-11-21",
      "name": "Day of the Queen of Peace",
      "type": "public",
      "impact": "medium",
      "localName": "Dia de la Reina de la Paz"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Noche Buena"
    },
    {
      "date": "2027-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high",
      "localName": "Fin de año"
    }
  ],
  "SX": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Nieuwjaarsdag"
    },
    {
      "date": "2027-02-08",
      "name": "Carnival Day",
      "type": "public",
      "impact": "medium",
      "localName": "Karnaval"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Goede vrijdag"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Pasen"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-04-27",
      "name": "King's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Koningsdag"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Dag van de Arbeid"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Hemelvaartsdag"
    },
    {
      "date": "2027-05-16",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Pinksteren"
    },
    {
      "date": "2027-07-01",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-10-10",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-11-11",
      "name": "Sint Maarten Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Kerstmis"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Tweede kerstdag"
    }
  ],
  "TC": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-08",
      "name": "Commonwealth Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-31",
      "name": "JAGS McCartney Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-31",
      "name": "King's Birthday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-01",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-30",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-09-24",
      "name": "National Youth Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-10-11",
      "name": "National Heritage Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "TN": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "رأس السنة الميلادية"
    },
    {
      "date": "2027-03-20",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "عيد الاستقلال"
    },
    {
      "date": "2027-04-09",
      "name": "Martyrs' Day",
      "type": "public",
      "impact": "medium",
      "localName": "عيد الشهداء"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "عيد الشغل"
    },
    {
      "date": "2027-07-25",
      "name": "Republic Day",
      "type": "public",
      "impact": "high",
      "localName": "عيد الجمهورية"
    },
    {
      "date": "2027-08-13",
      "name": "Women's Day",
      "type": "public",
      "impact": "medium",
      "localName": "عيد المرأة"
    },
    {
      "date": "2027-10-15",
      "name": "Evacuation Day",
      "type": "public",
      "impact": "medium",
      "localName": "عيد الجلاء"
    },
    {
      "date": "2027-12-17",
      "name": "Revolution Day",
      "type": "public",
      "impact": "medium",
      "localName": "عيد الثورة"
    }
  ],
  "TR": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Yılbaşı"
    },
    {
      "date": "2027-04-23",
      "name": "National Independence & Children's Day",
      "type": "public",
      "impact": "high",
      "localName": "Ulusal Egemenlik ve Çocuk Bayramı"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "İşçi Bayramı"
    },
    {
      "date": "2027-05-19",
      "name": "Atatürk Commemoration & Youth Day",
      "type": "public",
      "impact": "medium",
      "localName": "Atatürk'ü Anma, Gençlik ve Spor Bayramı"
    },
    {
      "date": "2027-07-15",
      "name": "Democracy and National Unity Day",
      "type": "public",
      "impact": "high",
      "localName": "Demokrasi ve Millî Birlik Günü"
    },
    {
      "date": "2027-08-30",
      "name": "Victory Day",
      "type": "public",
      "impact": "high",
      "localName": "Zafer Bayramı"
    },
    {
      "date": "2027-10-29",
      "name": "Republic Day",
      "type": "public",
      "impact": "high",
      "localName": "Cumhuriyet Bayramı"
    }
  ],
  "TT": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-30",
      "name": "Spiritual Baptist Shouter Liberation Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-27",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-30",
      "name": "Indian Arrival Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-19",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-08-01",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-31",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-09-24",
      "name": "Republic Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "UA": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Новий Рік"
    },
    {
      "date": "2027-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high",
      "localName": "Міжнародний жіночий день"
    },
    {
      "date": "2027-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "День праці"
    },
    {
      "date": "2027-05-02",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high",
      "localName": "Великдень"
    },
    {
      "date": "2027-05-08",
      "name": "Victory day over Nazism in World War II",
      "type": "public",
      "impact": "high",
      "localName": "День перемоги над нацизмом у Другій світовій війні"
    },
    {
      "date": "2027-06-20",
      "name": "Pentecost",
      "type": "public",
      "impact": "medium",
      "localName": "Трійця"
    },
    {
      "date": "2027-06-28",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "День Конституції"
    },
    {
      "date": "2027-07-15",
      "name": "Statehood Day",
      "type": "public",
      "impact": "medium",
      "localName": "День Української Державності"
    },
    {
      "date": "2027-08-24",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "День Незалежності"
    },
    {
      "date": "2027-10-01",
      "name": "Defender of Ukraine Day",
      "type": "public",
      "impact": "medium",
      "localName": "День захисників і захисниць України"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Різдво Христове"
    }
  ],
  "UG": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-26",
      "name": "Liberation Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-02-16",
      "name": "Archbishop Janani Luwum Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-06-03",
      "name": "Martyrs' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-09",
      "name": "National Heroes' Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-10-09",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "Boxing Day",
      "type": "public",
      "impact": "medium"
    }
  ],
  "US": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-18",
      "name": "Martin Luther King, Jr. Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-02-15",
      "name": "Presidents Day",
      "type": "public",
      "impact": "medium",
      "localName": "Washington's Birthday"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-08",
      "name": "Truman Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-05-31",
      "name": "Memorial Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-18",
      "name": "Juneteenth National Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-07-05",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-09-06",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Labor Day"
    },
    {
      "date": "2027-10-11",
      "name": "Columbus Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-10-11",
      "name": "Indigenous Peoples' Day",
      "type": "regional",
      "impact": "medium",
      "description": "地区性公共假日，具体影响以当地安排为准"
    },
    {
      "date": "2027-11-11",
      "name": "Veterans Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-11-25",
      "name": "Thanksgiving Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "UY": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Año Nuevo"
    },
    {
      "date": "2027-01-06",
      "name": "Children's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de los Niños"
    },
    {
      "date": "2027-02-08",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2027-02-09",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2027-03-25",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Semana de Turismo"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high",
      "localName": "Semana de Turismo"
    },
    {
      "date": "2027-04-19",
      "name": "Landing of the 33 Patriots Day",
      "type": "public",
      "impact": "medium",
      "localName": "Desembarco de los 33 Orientales"
    },
    {
      "date": "2027-05-01",
      "name": "International Workers' Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de los Trabajadores"
    },
    {
      "date": "2027-05-18",
      "name": "Battle of Las Piedras",
      "type": "public",
      "impact": "medium",
      "localName": "Batalla de las Piedras"
    },
    {
      "date": "2027-06-19",
      "name": "Birthday of José Gervasio Artigas and Never Again Day",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio de Artigas y Día del Nunca Más"
    },
    {
      "date": "2027-07-18",
      "name": "Constitution Day",
      "type": "public",
      "impact": "high",
      "localName": "Jura de la Constitución"
    },
    {
      "date": "2027-08-25",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Independencia"
    },
    {
      "date": "2027-10-12",
      "name": "Day of the race",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Raza"
    },
    {
      "date": "2027-11-02",
      "name": "Deceased ones day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de los Difuntos"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de la Familia"
    }
  ],
  "VC": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-02-08",
      "name": "Carnival Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-02-09",
      "name": "Carnival Tuesday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-14",
      "name": "National Heroes Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-05",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-10-27",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "VE": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Día de Año Nuevo"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Reyes"
    },
    {
      "date": "2027-02-08",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2027-02-09",
      "name": "Carnival",
      "type": "public",
      "impact": "medium",
      "localName": "Carnaval"
    },
    {
      "date": "2027-03-19",
      "name": "Saint Joseph's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de San José"
    },
    {
      "date": "2027-04-19",
      "name": "Beginning of the Independence Movement",
      "type": "public",
      "impact": "high",
      "localName": "Proclamación de la Independencia"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Día del Trabajador"
    },
    {
      "date": "2027-05-06",
      "name": "Ascension Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Ascención"
    },
    {
      "date": "2027-05-27",
      "name": "Corpus Christi",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-24",
      "name": "Anniversary of the Battle of Carabobo",
      "type": "public",
      "impact": "medium",
      "localName": "Aniversario de la Batalla de Carabobo"
    },
    {
      "date": "2027-07-05",
      "name": "Independence Day",
      "type": "public",
      "impact": "high",
      "localName": "Cinco de julio"
    },
    {
      "date": "2027-07-24",
      "name": "Simón Bolívar's Birthday",
      "type": "public",
      "impact": "medium",
      "localName": "Natalicio del Libertador Simón Bolívar"
    },
    {
      "date": "2027-10-12",
      "name": "Day of Indigenous Resistance",
      "type": "public",
      "impact": "medium",
      "localName": "Día de la Resistencia Indígena"
    },
    {
      "date": "2027-11-01",
      "name": "All Saints' Day",
      "type": "public",
      "impact": "medium",
      "localName": "Día de Todos los Santos"
    },
    {
      "date": "2027-12-08",
      "name": "Immaculate Conception Day",
      "type": "public",
      "impact": "medium",
      "localName": "La Inmaculada Concepción"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Eve",
      "type": "public",
      "impact": "high",
      "localName": "Nochebuena"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high",
      "localName": "Navidad"
    },
    {
      "date": "2027-12-31",
      "name": "New Year's Eve",
      "type": "public",
      "impact": "high",
      "localName": "Nochevieja"
    }
  ],
  "VG": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-08",
      "name": "Lavity Stoutt's Birthday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-17",
      "name": "Whit Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-11",
      "name": "Sovereign's Birthday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-07-01",
      "name": "Virgin Islands Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-02",
      "name": "Emancipation Monday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-03",
      "name": "Emancipation Tuesday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-04",
      "name": "Emancipation Wednesday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-10-18",
      "name": "Heroes and Foreparents Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-11-22",
      "name": "The 1949 Great March and Restoration Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-27",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-27",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "VI": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-06",
      "name": "Epiphany",
      "type": "public",
      "impact": "medium",
      "localName": "Three Kings Day"
    },
    {
      "date": "2027-01-18",
      "name": "Martin Luther King, Jr. Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-02-15",
      "name": "Presidents Day",
      "type": "public",
      "impact": "medium",
      "localName": "President's Day"
    },
    {
      "date": "2027-03-25",
      "name": "Maundy Thursday",
      "type": "public",
      "impact": "medium",
      "localName": "Holy Thursday"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-31",
      "name": "Transfer Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-31",
      "name": "Memorial Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-18",
      "name": "Juneteenth National Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-07-03",
      "name": "Emancipation Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-07-05",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-09-06",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Labor Day"
    },
    {
      "date": "2027-10-11",
      "name": "Columbus Day",
      "type": "public",
      "impact": "medium",
      "localName": "Virgin Islands–Puerto Rico Friendship Day & Columbus Day"
    },
    {
      "date": "2027-11-11",
      "name": "Veterans Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-11-25",
      "name": "Thanksgiving Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-24",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "high",
      "localName": "Second Day of Christmas"
    }
  ],
  "VN": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high",
      "localName": "Tết dương lịch"
    },
    {
      "date": "2027-04-30",
      "name": "Reunification Day",
      "type": "public",
      "impact": "medium",
      "localName": "Ngày Giải phóng miền Nam, thống nhất đất nước"
    },
    {
      "date": "2027-05-01",
      "name": "Labour Day",
      "type": "public",
      "impact": "high",
      "localName": "Ngày Quốc tế lao động"
    },
    {
      "date": "2027-09-02",
      "name": "National Day",
      "type": "public",
      "impact": "high",
      "localName": "Quốc khánh"
    }
  ],
  "WS": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-01-02",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-27",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-10",
      "name": "Mother's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-01",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-08-09",
      "name": "Father's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-10-11",
      "name": "Lotu a Tamaiti",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ],
  "ZA": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-22",
      "name": "Human Rights Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Family Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-04-27",
      "name": "Freedom Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-01",
      "name": "Workers' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-06-16",
      "name": "Youth Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-09",
      "name": "National Women's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-09-24",
      "name": "Heritage Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-16",
      "name": "Day of Reconciliation",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-27",
      "name": "Day of Goodwill",
      "type": "public",
      "impact": "medium",
      "localName": "St. Stephen's Day"
    }
  ],
  "ZM": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-08",
      "name": "International Women's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-12",
      "name": "Youth Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-27",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "high",
      "localName": "Easter Saturday"
    },
    {
      "date": "2027-03-28",
      "name": "Easter Sunday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-04-28",
      "name": "Kenneth Kaunda's Birthday",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-03",
      "name": "Labour Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-25",
      "name": "African Freedom Day",
      "type": "public",
      "impact": "medium",
      "localName": "Africa Freedom Day"
    },
    {
      "date": "2027-07-05",
      "name": "Heroes' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-07-06",
      "name": "Unity Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-02",
      "name": "Farmers' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-10-18",
      "name": "National Day of Prayer",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-10-25",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-27",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    }
  ],
  "ZW": [
    {
      "date": "2027-01-01",
      "name": "New Year's Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-02-21",
      "name": "Robert Mugabe National Youth Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-26",
      "name": "Good Friday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-03-27",
      "name": "Holy Saturday",
      "type": "public",
      "impact": "high",
      "localName": "Easter Saturday"
    },
    {
      "date": "2027-03-29",
      "name": "Easter Monday",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-04-18",
      "name": "Independence Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-05-01",
      "name": "Worker's Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-05-25",
      "name": "Africa Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-09",
      "name": "Heroes' Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-08-10",
      "name": "Defence Forces Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-22",
      "name": "Unity Day",
      "type": "public",
      "impact": "medium"
    },
    {
      "date": "2027-12-25",
      "name": "Christmas Day",
      "type": "public",
      "impact": "high"
    },
    {
      "date": "2027-12-26",
      "name": "St. Stephen's Day",
      "type": "public",
      "impact": "medium",
      "localName": "Boxing Day"
    }
  ]
}
