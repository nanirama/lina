/**
 * List of ICD codes / values. Not actively used, but useful if a separate diagnosis
 * code field is ever introduced
 */
export interface ICDCode {
  code: string;
  desc: string;
}

const icdCodes: Array<ICDCode> = [
  { code: "F01", desc: "Vascular dementia" },
  { code: "F02", desc: "Dementia in other diseases classified elsewhere" },
  { code: "F03", desc: "Unspecified dementia" },
  {
    code: "F04",
    desc: "Amnestic disorder due to known physiological condition",
  },
  { code: "F05", desc: "Delirium due to known physiological condition" },
  {
    code: "F06",
    desc: "Other mental disorders due to known physiological condition",
  },
  {
    code: "F07",
    desc: "Personality and behavioral disorders due to known physiological condition",
  },
  {
    code: "F09",
    desc: "Unspecified mental disorder due to known physiological condition",
  },
  { code: "F01.5", desc: "Vascular dementia" },
  { code: "F01.50", desc: "Vascular dementia without behavioral disturbance" },
  { code: "F01.51", desc: "Vascular dementia with behavioral disturbance" },
  { code: "F02.8", desc: "Dementia in other diseases classified elsewhere" },
  {
    code: "F02.80",
    desc: "Dementia in other diseases classified elsewhere without behavioral disturbance",
  },
  {
    code: "F02.81",
    desc: "Dementia in other diseases classified elsewhere with behavioral disturbance",
  },
  { code: "F03.9", desc: "Unspecified dementia" },
  {
    code: "F03.90",
    desc: "Unspecified dementia without behavioral disturbance",
  },
  { code: "F03.91", desc: "Unspecified dementia with behavioral disturbance" },
  {
    code: "F06.0",
    desc: "Psychotic disorder with hallucinations due to known physiological condition",
  },
  {
    code: "F06.1",
    desc: "Catatonic disorder due to known physiological condition",
  },
  {
    code: "F06.2",
    desc: "Psychotic disorder with delusions due to known physiological condition",
  },
  { code: "F06.3", desc: "Mood disorder due to known physiological condition" },
  {
    code: "F06.4",
    desc: "Anxiety disorder due to known physiological condition",
  },
  {
    code: "F06.8",
    desc: "Other specified mental disorders due to known physiological condition",
  },
  {
    code: "F06.30",
    desc: "Mood disorder due to known physiological condition, unspecified",
  },
  {
    code: "F06.31",
    desc: "Mood disorder due to known physiological condition with depressive features",
  },
  {
    code: "F06.32",
    desc: "Mood disorder due to known physiological condition with major depressive-like episode",
  },
  {
    code: "F06.33",
    desc: "Mood disorder due to known physiological condition with manic features",
  },
  {
    code: "F06.34",
    desc: "Mood disorder due to known physiological condition with mixed features",
  },
  {
    code: "F07.0",
    desc: "Personality change due to known physiological condition",
  },
  {
    code: "F07.8",
    desc: "Other personality and behavioral disorders due to known physiological condition",
  },
  {
    code: "F07.9",
    desc: "Unspecified personality and behavioral disorder due to known physiological condition",
  },
  { code: "F07.81", desc: "Postconcussional syndrome" },
  {
    code: "F07.89",
    desc: "Other personality and behavioral disorders due to known physiological condition",
  },
  { code: "F10", desc: "Alcohol related disorders" },
  { code: "F11", desc: "Opioid related disorders" },
  { code: "F12", desc: "Cannabis related disorders" },
  { code: "F13", desc: "Sedative, hypnotic, or anxiolytic related disorders" },
  { code: "F14", desc: "Cocaine related disorders" },
  { code: "F15", desc: "Other stimulant related disorders" },
  { code: "F16", desc: "Hallucinogen related disorders" },
  { code: "F17", desc: "Nicotine dependence" },
  { code: "F18", desc: "Inhalant related disorders" },
  { code: "F19", desc: "Other psychoactive substance related disorders" },
  { code: "F10.1", desc: "Alcohol abuse" },
  { code: "F10.2", desc: "Alcohol dependence" },
  { code: "F10.9", desc: "Alcohol use, unspecified" },
  { code: "F10.10", desc: "Alcohol abuse, uncomplicated" },
  { code: "F10.11", desc: "Alcohol abuse, in remission" },
  { code: "F10.12", desc: "Alcohol abuse with intoxication" },
  { code: "F10.13", desc: "Alcohol abuse, with withdrawal" },
  { code: "F10.14", desc: "Alcohol abuse with alcohol-induced mood disorder" },
  {
    code: "F10.15",
    desc: "Alcohol abuse with alcohol-induced psychotic disorder",
  },
  {
    code: "F10.18",
    desc: "Alcohol abuse with other alcohol-induced disorders",
  },
  {
    code: "F10.19",
    desc: "Alcohol abuse with unspecified alcohol-induced disorder",
  },
  { code: "F10.120", desc: "Alcohol abuse with intoxication, uncomplicated" },
  { code: "F10.121", desc: "Alcohol abuse with intoxication delirium" },
  { code: "F10.129", desc: "Alcohol abuse with intoxication, unspecified" },
  { code: "F10.130", desc: "Alcohol abuse with withdrawal, uncomplicated" },
  { code: "F10.131", desc: "Alcohol abuse with withdrawal delirium" },
  {
    code: "F10.132",
    desc: "Alcohol abuse with withdrawal with perceptual disturbance",
  },
  { code: "F10.139", desc: "Alcohol abuse with withdrawal, unspecified" },
  {
    code: "F10.150",
    desc: "Alcohol abuse with alcohol-induced psychotic disorder with delusions",
  },
  {
    code: "F10.151",
    desc: "Alcohol abuse with alcohol-induced psychotic disorder with hallucinations",
  },
  {
    code: "F10.159",
    desc: "Alcohol abuse with alcohol-induced psychotic disorder, unspecified",
  },
  {
    code: "F10.180",
    desc: "Alcohol abuse with alcohol-induced anxiety disorder",
  },
  {
    code: "F10.181",
    desc: "Alcohol abuse with alcohol-induced sexual dysfunction",
  },
  {
    code: "F10.182",
    desc: "Alcohol abuse with alcohol-induced sleep disorder",
  },
  {
    code: "F10.188",
    desc: "Alcohol abuse with other alcohol-induced disorder",
  },
  { code: "F10.20", desc: "Alcohol dependence, uncomplicated" },
  { code: "F10.21", desc: "Alcohol dependence, in remission" },
  { code: "F10.22", desc: "Alcohol dependence with intoxication" },
  { code: "F10.23", desc: "Alcohol dependence with withdrawal" },
  {
    code: "F10.24",
    desc: "Alcohol dependence with alcohol-induced mood disorder",
  },
  {
    code: "F10.25",
    desc: "Alcohol dependence with alcohol-induced psychotic disorder",
  },
  {
    code: "F10.26",
    desc: "Alcohol dependence with alcohol-induced persisting amnestic disorder",
  },
  {
    code: "F10.27",
    desc: "Alcohol dependence with alcohol-induced persisting dementia",
  },
  {
    code: "F10.28",
    desc: "Alcohol dependence with other alcohol-induced disorders",
  },
  {
    code: "F10.29",
    desc: "Alcohol dependence with unspecified alcohol-induced disorder",
  },
  {
    code: "F10.220",
    desc: "Alcohol dependence with intoxication, uncomplicated",
  },
  { code: "F10.221", desc: "Alcohol dependence with intoxication delirium" },
  {
    code: "F10.229",
    desc: "Alcohol dependence with intoxication, unspecified",
  },
  {
    code: "F10.230",
    desc: "Alcohol dependence with withdrawal, uncomplicated",
  },
  { code: "F10.231", desc: "Alcohol dependence with withdrawal delirium" },
  {
    code: "F10.232",
    desc: "Alcohol dependence with withdrawal with perceptual disturbance",
  },
  { code: "F10.239", desc: "Alcohol dependence with withdrawal, unspecified" },
  {
    code: "F10.250",
    desc: "Alcohol dependence with alcohol-induced psychotic disorder with delusions",
  },
  {
    code: "F10.251",
    desc: "Alcohol dependence with alcohol-induced psychotic disorder with hallucinations",
  },
  {
    code: "F10.259",
    desc: "Alcohol dependence with alcohol-induced psychotic disorder, unspecified",
  },
  {
    code: "F10.280",
    desc: "Alcohol dependence with alcohol-induced anxiety disorder",
  },
  {
    code: "F10.281",
    desc: "Alcohol dependence with alcohol-induced sexual dysfunction",
  },
  {
    code: "F10.282",
    desc: "Alcohol dependence with alcohol-induced sleep disorder",
  },
  {
    code: "F10.288",
    desc: "Alcohol dependence with other alcohol-induced disorder",
  },
  { code: "F10.92", desc: "Alcohol use, unspecified with intoxication" },
  { code: "F10.93", desc: "Alcohol use, unspecified with withdrawal" },
  {
    code: "F10.94",
    desc: "Alcohol use, unspecified with alcohol-induced mood disorder",
  },
  {
    code: "F10.95",
    desc: "Alcohol use, unspecified with alcohol-induced psychotic disorder",
  },
  {
    code: "F10.96",
    desc: "Alcohol use, unspecified with alcohol-induced persisting amnestic disorder",
  },
  {
    code: "F10.97",
    desc: "Alcohol use, unspecified with alcohol-induced persisting dementia",
  },
  {
    code: "F10.98",
    desc: "Alcohol use, unspecified with other alcohol-induced disorders",
  },
  {
    code: "F10.99",
    desc: "Alcohol use, unspecified with unspecified alcohol-induced disorder",
  },
  {
    code: "F10.920",
    desc: "Alcohol use, unspecified with intoxication, uncomplicated",
  },
  {
    code: "F10.921",
    desc: "Alcohol use, unspecified with intoxication delirium",
  },
  {
    code: "F10.929",
    desc: "Alcohol use, unspecified with intoxication, unspecified",
  },
  {
    code: "F10.930",
    desc: "Alcohol use, unspecified with withdrawal, uncomplicated",
  },
  {
    code: "F10.931",
    desc: "Alcohol use, unspecified with withdrawal delirium",
  },
  {
    code: "F10.932",
    desc: "Alcohol use, unspecified with withdrawal with perceptual disturbance",
  },
  {
    code: "F10.939",
    desc: "Alcohol use, unspecified with withdrawal, unspecified",
  },
  {
    code: "F10.950",
    desc: "Alcohol use, unspecified with alcohol-induced psychotic disorder with delusions",
  },
  {
    code: "F10.951",
    desc: "Alcohol use, unspecified with alcohol-induced psychotic disorder with hallucinations",
  },
  {
    code: "F10.959",
    desc: "Alcohol use, unspecified with alcohol-induced psychotic disorder, unspecified",
  },
  {
    code: "F10.980",
    desc: "Alcohol use, unspecified with alcohol-induced anxiety disorder",
  },
  {
    code: "F10.981",
    desc: "Alcohol use, unspecified with alcohol-induced sexual dysfunction",
  },
  {
    code: "F10.982",
    desc: "Alcohol use, unspecified with alcohol-induced sleep disorder",
  },
  {
    code: "F10.988",
    desc: "Alcohol use, unspecified with other alcohol-induced disorder",
  },
  { code: "F11.1", desc: "Opioid abuse" },
  { code: "F11.2", desc: "Opioid dependence" },
  { code: "F11.9", desc: "Opioid use, unspecified" },
  { code: "F11.10", desc: "Opioid abuse, uncomplicated" },
  { code: "F11.11", desc: "Opioid abuse, in remission" },
  { code: "F11.12", desc: "Opioid abuse with intoxication" },
  { code: "F11.13", desc: "Opioid abuse with withdrawal" },
  { code: "F11.14", desc: "Opioid abuse with opioid-induced mood disorder" },
  {
    code: "F11.15",
    desc: "Opioid abuse with opioid-induced psychotic disorder",
  },
  { code: "F11.18", desc: "Opioid abuse with other opioid-induced disorder" },
  {
    code: "F11.19",
    desc: "Opioid abuse with unspecified opioid-induced disorder",
  },
  { code: "F11.120", desc: "Opioid abuse with intoxication, uncomplicated" },
  { code: "F11.121", desc: "Opioid abuse with intoxication delirium" },
  {
    code: "F11.122",
    desc: "Opioid abuse with intoxication with perceptual disturbance",
  },
  { code: "F11.129", desc: "Opioid abuse with intoxication, unspecified" },
  {
    code: "F11.150",
    desc: "Opioid abuse with opioid-induced psychotic disorder with delusions",
  },
  {
    code: "F11.151",
    desc: "Opioid abuse with opioid-induced psychotic disorder with hallucinations",
  },
  {
    code: "F11.159",
    desc: "Opioid abuse with opioid-induced psychotic disorder, unspecified",
  },
  {
    code: "F11.181",
    desc: "Opioid abuse with opioid-induced sexual dysfunction",
  },
  { code: "F11.182", desc: "Opioid abuse with opioid-induced sleep disorder" },
  { code: "F11.188", desc: "Opioid abuse with other opioid-induced disorder" },
  { code: "F11.20", desc: "Opioid dependence, uncomplicated" },
  { code: "F11.21", desc: "Opioid dependence, in remission" },
  { code: "F11.22", desc: "Opioid dependence with intoxication" },
  { code: "F11.23", desc: "Opioid dependence with withdrawal" },
  {
    code: "F11.24",
    desc: "Opioid dependence with opioid-induced mood disorder",
  },
  {
    code: "F11.25",
    desc: "Opioid dependence with opioid-induced psychotic disorder",
  },
  {
    code: "F11.28",
    desc: "Opioid dependence with other opioid-induced disorder",
  },
  {
    code: "F11.29",
    desc: "Opioid dependence with unspecified opioid-induced disorder",
  },
  {
    code: "F11.220",
    desc: "Opioid dependence with intoxication, uncomplicated",
  },
  { code: "F11.221", desc: "Opioid dependence with intoxication delirium" },
  {
    code: "F11.222",
    desc: "Opioid dependence with intoxication with perceptual disturbance",
  },
  { code: "F11.229", desc: "Opioid dependence with intoxication, unspecified" },
  {
    code: "F11.250",
    desc: "Opioid dependence with opioid-induced psychotic disorder with delusions",
  },
  {
    code: "F11.251",
    desc: "Opioid dependence with opioid-induced psychotic disorder with hallucinations",
  },
  {
    code: "F11.259",
    desc: "Opioid dependence with opioid-induced psychotic disorder, unspecified",
  },
  {
    code: "F11.281",
    desc: "Opioid dependence with opioid-induced sexual dysfunction",
  },
  {
    code: "F11.282",
    desc: "Opioid dependence with opioid-induced sleep disorder",
  },
  {
    code: "F11.288",
    desc: "Opioid dependence with other opioid-induced disorder",
  },
  { code: "F11.90", desc: "Opioid use, unspecified, uncomplicated" },
  { code: "F11.92", desc: "Opioid use, unspecified with intoxication" },
  { code: "F11.93", desc: "Opioid use, unspecified with withdrawal" },
  {
    code: "F11.94",
    desc: "Opioid use, unspecified with opioid-induced mood disorder",
  },
  {
    code: "F11.95",
    desc: "Opioid use, unspecified with opioid-induced psychotic disorder",
  },
  {
    code: "F11.98",
    desc: "Opioid use, unspecified with other specified opioid-induced disorder",
  },
  {
    code: "F11.99",
    desc: "Opioid use, unspecified with unspecified opioid-induced disorder",
  },
  {
    code: "F11.920",
    desc: "Opioid use, unspecified with intoxication, uncomplicated",
  },
  {
    code: "F11.921",
    desc: "Opioid use, unspecified with intoxication delirium",
  },
  {
    code: "F11.922",
    desc: "Opioid use, unspecified with intoxication with perceptual disturbance",
  },
  {
    code: "F11.929",
    desc: "Opioid use, unspecified with intoxication, unspecified",
  },
  {
    code: "F11.950",
    desc: "Opioid use, unspecified with opioid-induced psychotic disorder with delusions",
  },
  {
    code: "F11.951",
    desc: "Opioid use, unspecified with opioid-induced psychotic disorder with hallucinations",
  },
  {
    code: "F11.959",
    desc: "Opioid use, unspecified with opioid-induced psychotic disorder, unspecified",
  },
  {
    code: "F11.981",
    desc: "Opioid use, unspecified with opioid-induced sexual dysfunction",
  },
  {
    code: "F11.982",
    desc: "Opioid use, unspecified with opioid-induced sleep disorder",
  },
  {
    code: "F11.988",
    desc: "Opioid use, unspecified with other opioid-induced disorder",
  },
  { code: "F12.1", desc: "Cannabis abuse" },
  { code: "F12.2", desc: "Cannabis dependence" },
  { code: "F12.9", desc: "Cannabis use, unspecified" },
  { code: "F12.10", desc: "Cannabis abuse, uncomplicated" },
  { code: "F12.11", desc: "Cannabis abuse, in remission" },
  { code: "F12.12", desc: "Cannabis abuse with intoxication" },
  { code: "F12.13", desc: "Cannabis abuse with withdrawal" },
  { code: "F12.15", desc: "Cannabis abuse with psychotic disorder" },
  {
    code: "F12.18",
    desc: "Cannabis abuse with other cannabis-induced disorder",
  },
  {
    code: "F12.19",
    desc: "Cannabis abuse with unspecified cannabis-induced disorder",
  },
  { code: "F12.120", desc: "Cannabis abuse with intoxication, uncomplicated" },
  { code: "F12.121", desc: "Cannabis abuse with intoxication delirium" },
  {
    code: "F12.122",
    desc: "Cannabis abuse with intoxication with perceptual disturbance",
  },
  { code: "F12.129", desc: "Cannabis abuse with intoxication, unspecified" },
  {
    code: "F12.150",
    desc: "Cannabis abuse with psychotic disorder with delusions",
  },
  {
    code: "F12.151",
    desc: "Cannabis abuse with psychotic disorder with hallucinations",
  },
  {
    code: "F12.159",
    desc: "Cannabis abuse with psychotic disorder, unspecified",
  },
  {
    code: "F12.180",
    desc: "Cannabis abuse with cannabis-induced anxiety disorder",
  },
  {
    code: "F12.188",
    desc: "Cannabis abuse with other cannabis-induced disorder",
  },
  { code: "F12.20", desc: "Cannabis dependence, uncomplicated" },
  { code: "F12.21", desc: "Cannabis dependence, in remission" },
  { code: "F12.22", desc: "Cannabis dependence with intoxication" },
  { code: "F12.23", desc: "Cannabis dependence with withdrawal" },
  { code: "F12.25", desc: "Cannabis dependence with psychotic disorder" },
  {
    code: "F12.28",
    desc: "Cannabis dependence with other cannabis-induced disorder",
  },
  {
    code: "F12.29",
    desc: "Cannabis dependence with unspecified cannabis-induced disorder",
  },
  {
    code: "F12.220",
    desc: "Cannabis dependence with intoxication, uncomplicated",
  },
  { code: "F12.221", desc: "Cannabis dependence with intoxication delirium" },
  {
    code: "F12.222",
    desc: "Cannabis dependence with intoxication with perceptual disturbance",
  },
  {
    code: "F12.229",
    desc: "Cannabis dependence with intoxication, unspecified",
  },
  {
    code: "F12.250",
    desc: "Cannabis dependence with psychotic disorder with delusions",
  },
  {
    code: "F12.251",
    desc: "Cannabis dependence with psychotic disorder with hallucinations",
  },
  {
    code: "F12.259",
    desc: "Cannabis dependence with psychotic disorder, unspecified",
  },
  {
    code: "F12.280",
    desc: "Cannabis dependence with cannabis-induced anxiety disorder",
  },
  {
    code: "F12.288",
    desc: "Cannabis dependence with other cannabis-induced disorder",
  },
  { code: "F12.90", desc: "Cannabis use, unspecified, uncomplicated" },
  { code: "F12.92", desc: "Cannabis use, unspecified with intoxication" },
  { code: "F12.93", desc: "Cannabis use, unspecified with withdrawal" },
  { code: "F12.95", desc: "Cannabis use, unspecified with psychotic disorder" },
  {
    code: "F12.98",
    desc: "Cannabis use, unspecified with other cannabis-induced disorder",
  },
  {
    code: "F12.99",
    desc: "Cannabis use, unspecified with unspecified cannabis-induced disorder",
  },
  {
    code: "F12.920",
    desc: "Cannabis use, unspecified with intoxication, uncomplicated",
  },
  {
    code: "F12.921",
    desc: "Cannabis use, unspecified with intoxication delirium",
  },
  {
    code: "F12.922",
    desc: "Cannabis use, unspecified with intoxication with perceptual disturbance",
  },
  {
    code: "F12.929",
    desc: "Cannabis use, unspecified with intoxication, unspecified",
  },
  {
    code: "F12.950",
    desc: "Cannabis use, unspecified with psychotic disorder with delusions",
  },
  {
    code: "F12.951",
    desc: "Cannabis use, unspecified with psychotic disorder with hallucinations",
  },
  {
    code: "F12.959",
    desc: "Cannabis use, unspecified with psychotic disorder, unspecified",
  },
  { code: "F12.980", desc: "Cannabis use, unspecified with anxiety disorder" },
  {
    code: "F12.988",
    desc: "Cannabis use, unspecified with other cannabis-induced disorder",
  },
  { code: "F13.1", desc: "Sedative, hypnotic or anxiolytic-related abuse" },
  {
    code: "F13.2",
    desc: "Sedative, hypnotic or anxiolytic-related dependence",
  },
  {
    code: "F13.9",
    desc: "Sedative, hypnotic or anxiolytic-related use, unspecified",
  },
  {
    code: "F13.10",
    desc: "Sedative, hypnotic or anxiolytic abuse, uncomplicated",
  },
  {
    code: "F13.11",
    desc: "Sedative, hypnotic or anxiolytic abuse, in remission",
  },
  {
    code: "F13.12",
    desc: "Sedative, hypnotic or anxiolytic abuse with intoxication",
  },
  {
    code: "F13.13",
    desc: "Sedative, hypnotic or anxiolytic abuse with withdrawal",
  },
  {
    code: "F13.14",
    desc: "Sedative, hypnotic or anxiolytic abuse with sedative, hypnotic or anxiolytic-induced mood disorder",
  },
  {
    code: "F13.15",
    desc: "Sedative, hypnotic or anxiolytic abuse with sedative, hypnotic or anxiolytic-induced psychotic disorder",
  },
  {
    code: "F13.18",
    desc: "Sedative, hypnotic or anxiolytic abuse with other sedative, hypnotic or anxiolytic-induced disorders",
  },
  {
    code: "F13.19",
    desc: "Sedative, hypnotic or anxiolytic abuse with unspecified sedative, hypnotic or anxiolytic-induced disorder",
  },
  {
    code: "F13.120",
    desc: "Sedative, hypnotic or anxiolytic abuse with intoxication, uncomplicated",
  },
  {
    code: "F13.121",
    desc: "Sedative, hypnotic or anxiolytic abuse with intoxication delirium",
  },
  {
    code: "F13.129",
    desc: "Sedative, hypnotic or anxiolytic abuse with intoxication, unspecified",
  },
  {
    code: "F13.130",
    desc: "Sedative, hypnotic or anxiolytic abuse with withdrawal, uncomplicated",
  },
  {
    code: "F13.131",
    desc: "Sedative, hypnotic or anxiolytic abuse with withdrawal delirium",
  },
  {
    code: "F13.132",
    desc: "Sedative, hypnotic or anxiolytic abuse with withdrawal with perceptual disturbance",
  },
  {
    code: "F13.139",
    desc: "Sedative, hypnotic or anxiolytic abuse with withdrawal, unspecified",
  },
  {
    code: "F13.150",
    desc: "Sedative, hypnotic or anxiolytic abuse with sedative, hypnotic or anxiolytic-induced psychotic disorder with delusions",
  },
  {
    code: "F13.151",
    desc: "Sedative, hypnotic or anxiolytic abuse with sedative, hypnotic or anxiolytic-induced psychotic disorder with hallucinations",
  },
  {
    code: "F13.159",
    desc: "Sedative, hypnotic or anxiolytic abuse with sedative, hypnotic or anxiolytic-induced psychotic disorder, unspecified",
  },
  {
    code: "F13.180",
    desc: "Sedative, hypnotic or anxiolytic abuse with sedative, hypnotic or anxiolytic-induced anxiety disorder",
  },
  {
    code: "F13.181",
    desc: "Sedative, hypnotic or anxiolytic abuse with sedative, hypnotic or anxiolytic-induced sexual dysfunction",
  },
  {
    code: "F13.182",
    desc: "Sedative, hypnotic or anxiolytic abuse with sedative, hypnotic or anxiolytic-induced sleep disorder",
  },
  {
    code: "F13.188",
    desc: "Sedative, hypnotic or anxiolytic abuse with other sedative, hypnotic or anxiolytic-induced disorder",
  },
  {
    code: "F13.20",
    desc: "Sedative, hypnotic or anxiolytic dependence, uncomplicated",
  },
  {
    code: "F13.21",
    desc: "Sedative, hypnotic or anxiolytic dependence, in remission",
  },
  {
    code: "F13.22",
    desc: "Sedative, hypnotic or anxiolytic dependence with intoxication",
  },
  {
    code: "F13.23",
    desc: "Sedative, hypnotic or anxiolytic dependence with withdrawal",
  },
  {
    code: "F13.24",
    desc: "Sedative, hypnotic or anxiolytic dependence with sedative, hypnotic or anxiolytic-induced mood disorder",
  },
  {
    code: "F13.25",
    desc: "Sedative, hypnotic or anxiolytic dependence with sedative, hypnotic or anxiolytic-induced psychotic disorder",
  },
  {
    code: "F13.26",
    desc: "Sedative, hypnotic or anxiolytic dependence with sedative, hypnotic or anxiolytic-induced persisting amnestic disorder",
  },
  {
    code: "F13.27",
    desc: "Sedative, hypnotic or anxiolytic dependence with sedative, hypnotic or anxiolytic-induced persisting dementia",
  },
  {
    code: "F13.28",
    desc: "Sedative, hypnotic or anxiolytic dependence with other sedative, hypnotic or anxiolytic-induced disorders",
  },
  {
    code: "F13.29",
    desc: "Sedative, hypnotic or anxiolytic dependence with unspecified sedative, hypnotic or anxiolytic-induced disorder",
  },
  {
    code: "F13.220",
    desc: "Sedative, hypnotic or anxiolytic dependence with intoxication, uncomplicated",
  },
  {
    code: "F13.221",
    desc: "Sedative, hypnotic or anxiolytic dependence with intoxication delirium",
  },
  {
    code: "F13.229",
    desc: "Sedative, hypnotic or anxiolytic dependence with intoxication, unspecified",
  },
  {
    code: "F13.230",
    desc: "Sedative, hypnotic or anxiolytic dependence with withdrawal, uncomplicated",
  },
  {
    code: "F13.231",
    desc: "Sedative, hypnotic or anxiolytic dependence with withdrawal delirium",
  },
  {
    code: "F13.232",
    desc: "Sedative, hypnotic or anxiolytic dependence with withdrawal with perceptual disturbance",
  },
  {
    code: "F13.239",
    desc: "Sedative, hypnotic or anxiolytic dependence with withdrawal, unspecified",
  },
  {
    code: "F13.250",
    desc: "Sedative, hypnotic or anxiolytic dependence with sedative, hypnotic or anxiolytic-induced psychotic disorder with delusions",
  },
  {
    code: "F13.251",
    desc: "Sedative, hypnotic or anxiolytic dependence with sedative, hypnotic or anxiolytic-induced psychotic disorder with hallucinations",
  },
  {
    code: "F13.259",
    desc: "Sedative, hypnotic or anxiolytic dependence with sedative, hypnotic or anxiolytic-induced psychotic disorder, unspecified",
  },
  {
    code: "F13.280",
    desc: "Sedative, hypnotic or anxiolytic dependence with sedative, hypnotic or anxiolytic-induced anxiety disorder",
  },
  {
    code: "F13.281",
    desc: "Sedative, hypnotic or anxiolytic dependence with sedative, hypnotic or anxiolytic-induced sexual dysfunction",
  },
  {
    code: "F13.282",
    desc: "Sedative, hypnotic or anxiolytic dependence with sedative, hypnotic or anxiolytic-induced sleep disorder",
  },
  {
    code: "F13.288",
    desc: "Sedative, hypnotic or anxiolytic dependence with other sedative, hypnotic or anxiolytic-induced disorder",
  },
  {
    code: "F13.90",
    desc: "Sedative, hypnotic, or anxiolytic use, unspecified, uncomplicated",
  },
  {
    code: "F13.92",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with intoxication",
  },
  {
    code: "F13.93",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with withdrawal",
  },
  {
    code: "F13.94",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with sedative, hypnotic or anxiolytic-induced mood disorder",
  },
  {
    code: "F13.95",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with sedative, hypnotic or anxiolytic-induced psychotic disorder",
  },
  {
    code: "F13.96",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with sedative, hypnotic or anxiolytic-induced persisting amnestic disorder",
  },
  {
    code: "F13.97",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with sedative, hypnotic or anxiolytic-induced persisting dementia",
  },
  {
    code: "F13.98",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with other sedative, hypnotic or anxiolytic-induced disorders",
  },
  {
    code: "F13.99",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with unspecified sedative, hypnotic or anxiolytic-induced disorder",
  },
  {
    code: "F13.920",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with intoxication, uncomplicated",
  },
  {
    code: "F13.921",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with intoxication delirium",
  },
  {
    code: "F13.929",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with intoxication, unspecified",
  },
  {
    code: "F13.930",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with withdrawal, uncomplicated",
  },
  {
    code: "F13.931",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with withdrawal delirium",
  },
  {
    code: "F13.932",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with withdrawal with perceptual disturbances",
  },
  {
    code: "F13.939",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with withdrawal, unspecified",
  },
  {
    code: "F13.950",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with sedative, hypnotic or anxiolytic-induced psychotic disorder with delusions",
  },
  {
    code: "F13.951",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with sedative, hypnotic or anxiolytic-induced psychotic disorder with hallucinations",
  },
  {
    code: "F13.959",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with sedative, hypnotic or anxiolytic-induced psychotic disorder, unspecified",
  },
  {
    code: "F13.980",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with sedative, hypnotic or anxiolytic-induced anxiety disorder",
  },
  {
    code: "F13.981",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with sedative, hypnotic or anxiolytic-induced sexual dysfunction",
  },
  {
    code: "F13.982",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with sedative, hypnotic or anxiolytic-induced sleep disorder",
  },
  {
    code: "F13.988",
    desc: "Sedative, hypnotic or anxiolytic use, unspecified with other sedative, hypnotic or anxiolytic-induced disorder",
  },
  { code: "F14.1", desc: "Cocaine abuse" },
  { code: "F14.2", desc: "Cocaine dependence" },
  { code: "F14.9", desc: "Cocaine use, unspecified" },
  { code: "F14.10", desc: "Cocaine abuse, uncomplicated" },
  { code: "F14.11", desc: "Cocaine abuse, in remission" },
  { code: "F14.12", desc: "Cocaine abuse with intoxication" },
  { code: "F14.13", desc: "Cocaine abuse, unspecified with withdrawal" },
  { code: "F14.14", desc: "Cocaine abuse with cocaine-induced mood disorder" },
  {
    code: "F14.15",
    desc: "Cocaine abuse with cocaine-induced psychotic disorder",
  },
  { code: "F14.18", desc: "Cocaine abuse with other cocaine-induced disorder" },
  {
    code: "F14.19",
    desc: "Cocaine abuse with unspecified cocaine-induced disorder",
  },
  { code: "F14.120", desc: "Cocaine abuse with intoxication, uncomplicated" },
  { code: "F14.121", desc: "Cocaine abuse with intoxication with delirium" },
  {
    code: "F14.122",
    desc: "Cocaine abuse with intoxication with perceptual disturbance",
  },
  { code: "F14.129", desc: "Cocaine abuse with intoxication, unspecified" },
  {
    code: "F14.150",
    desc: "Cocaine abuse with cocaine-induced psychotic disorder with delusions",
  },
  {
    code: "F14.151",
    desc: "Cocaine abuse with cocaine-induced psychotic disorder with hallucinations",
  },
  {
    code: "F14.159",
    desc: "Cocaine abuse with cocaine-induced psychotic disorder, unspecified",
  },
  {
    code: "F14.180",
    desc: "Cocaine abuse with cocaine-induced anxiety disorder",
  },
  {
    code: "F14.181",
    desc: "Cocaine abuse with cocaine-induced sexual dysfunction",
  },
  {
    code: "F14.182",
    desc: "Cocaine abuse with cocaine-induced sleep disorder",
  },
  {
    code: "F14.188",
    desc: "Cocaine abuse with other cocaine-induced disorder",
  },
  { code: "F14.20", desc: "Cocaine dependence, uncomplicated" },
  { code: "F14.21", desc: "Cocaine dependence, in remission" },
  { code: "F14.22", desc: "Cocaine dependence with intoxication" },
  { code: "F14.23", desc: "Cocaine dependence with withdrawal" },
  {
    code: "F14.24",
    desc: "Cocaine dependence with cocaine-induced mood disorder",
  },
  {
    code: "F14.25",
    desc: "Cocaine dependence with cocaine-induced psychotic disorder",
  },
  {
    code: "F14.28",
    desc: "Cocaine dependence with other cocaine-induced disorder",
  },
  {
    code: "F14.29",
    desc: "Cocaine dependence with unspecified cocaine-induced disorder",
  },
  {
    code: "F14.220",
    desc: "Cocaine dependence with intoxication, uncomplicated",
  },
  { code: "F14.221", desc: "Cocaine dependence with intoxication delirium" },
  {
    code: "F14.222",
    desc: "Cocaine dependence with intoxication with perceptual disturbance",
  },
  {
    code: "F14.229",
    desc: "Cocaine dependence with intoxication, unspecified",
  },
  {
    code: "F14.250",
    desc: "Cocaine dependence with cocaine-induced psychotic disorder with delusions",
  },
  {
    code: "F14.251",
    desc: "Cocaine dependence with cocaine-induced psychotic disorder with hallucinations",
  },
  {
    code: "F14.259",
    desc: "Cocaine dependence with cocaine-induced psychotic disorder, unspecified",
  },
  {
    code: "F14.280",
    desc: "Cocaine dependence with cocaine-induced anxiety disorder",
  },
  {
    code: "F14.281",
    desc: "Cocaine dependence with cocaine-induced sexual dysfunction",
  },
  {
    code: "F14.282",
    desc: "Cocaine dependence with cocaine-induced sleep disorder",
  },
  {
    code: "F14.288",
    desc: "Cocaine dependence with other cocaine-induced disorder",
  },
  { code: "F14.90", desc: "Cocaine use, unspecified, uncomplicated" },
  { code: "F14.92", desc: "Cocaine use, unspecified with intoxication" },
  { code: "F14.93", desc: "Cocaine use, unspecified with withdrawal" },
  {
    code: "F14.94",
    desc: "Cocaine use, unspecified with cocaine-induced mood disorder",
  },
  {
    code: "F14.95",
    desc: "Cocaine use, unspecified with cocaine-induced psychotic disorder",
  },
  {
    code: "F14.98",
    desc: "Cocaine use, unspecified with other specified cocaine-induced disorder",
  },
  {
    code: "F14.99",
    desc: "Cocaine use, unspecified with unspecified cocaine-induced disorder",
  },
  {
    code: "F14.920",
    desc: "Cocaine use, unspecified with intoxication, uncomplicated",
  },
  {
    code: "F14.921",
    desc: "Cocaine use, unspecified with intoxication delirium",
  },
  {
    code: "F14.922",
    desc: "Cocaine use, unspecified with intoxication with perceptual disturbance",
  },
  {
    code: "F14.929",
    desc: "Cocaine use, unspecified with intoxication, unspecified",
  },
  {
    code: "F14.950",
    desc: "Cocaine use, unspecified with cocaine-induced psychotic disorder with delusions",
  },
  {
    code: "F14.951",
    desc: "Cocaine use, unspecified with cocaine-induced psychotic disorder with hallucinations",
  },
  {
    code: "F14.959",
    desc: "Cocaine use, unspecified with cocaine-induced psychotic disorder, unspecified",
  },
  {
    code: "F14.980",
    desc: "Cocaine use, unspecified with cocaine-induced anxiety disorder",
  },
  {
    code: "F14.981",
    desc: "Cocaine use, unspecified with cocaine-induced sexual dysfunction",
  },
  {
    code: "F14.982",
    desc: "Cocaine use, unspecified with cocaine-induced sleep disorder",
  },
  {
    code: "F14.988",
    desc: "Cocaine use, unspecified with other cocaine-induced disorder",
  },
  { code: "F15.1", desc: "Other stimulant abuse" },
  { code: "F15.2", desc: "Other stimulant dependence" },
  { code: "F15.9", desc: "Other stimulant use, unspecified" },
  { code: "F15.10", desc: "Other stimulant abuse, uncomplicated" },
  { code: "F15.11", desc: "Other stimulant abuse, in remission" },
  { code: "F15.12", desc: "Other stimulant abuse with intoxication" },
  { code: "F15.13", desc: "Other stimulant abuse with withdrawal" },
  {
    code: "F15.14",
    desc: "Other stimulant abuse with stimulant-induced mood disorder",
  },
  {
    code: "F15.15",
    desc: "Other stimulant abuse with stimulant-induced psychotic disorder",
  },
  {
    code: "F15.18",
    desc: "Other stimulant abuse with other stimulant-induced disorder",
  },
  {
    code: "F15.19",
    desc: "Other stimulant abuse with unspecified stimulant-induced disorder",
  },
  {
    code: "F15.120",
    desc: "Other stimulant abuse with intoxication, uncomplicated",
  },
  { code: "F15.121", desc: "Other stimulant abuse with intoxication delirium" },
  {
    code: "F15.122",
    desc: "Other stimulant abuse with intoxication with perceptual disturbance",
  },
  {
    code: "F15.129",
    desc: "Other stimulant abuse with intoxication, unspecified",
  },
  {
    code: "F15.150",
    desc: "Other stimulant abuse with stimulant-induced psychotic disorder with delusions",
  },
  {
    code: "F15.151",
    desc: "Other stimulant abuse with stimulant-induced psychotic disorder with hallucinations",
  },
  {
    code: "F15.159",
    desc: "Other stimulant abuse with stimulant-induced psychotic disorder, unspecified",
  },
  {
    code: "F15.180",
    desc: "Other stimulant abuse with stimulant-induced anxiety disorder",
  },
  {
    code: "F15.181",
    desc: "Other stimulant abuse with stimulant-induced sexual dysfunction",
  },
  {
    code: "F15.182",
    desc: "Other stimulant abuse with stimulant-induced sleep disorder",
  },
  {
    code: "F15.188",
    desc: "Other stimulant abuse with other stimulant-induced disorder",
  },
  { code: "F15.20", desc: "Other stimulant dependence, uncomplicated" },
  { code: "F15.21", desc: "Other stimulant dependence, in remission" },
  { code: "F15.22", desc: "Other stimulant dependence with intoxication" },
  { code: "F15.23", desc: "Other stimulant dependence with withdrawal" },
  {
    code: "F15.24",
    desc: "Other stimulant dependence with stimulant-induced mood disorder",
  },
  {
    code: "F15.25",
    desc: "Other stimulant dependence with stimulant-induced psychotic disorder",
  },
  {
    code: "F15.28",
    desc: "Other stimulant dependence with other stimulant-induced disorder",
  },
  {
    code: "F15.29",
    desc: "Other stimulant dependence with unspecified stimulant-induced disorder",
  },
  {
    code: "F15.220",
    desc: "Other stimulant dependence with intoxication, uncomplicated",
  },
  {
    code: "F15.221",
    desc: "Other stimulant dependence with intoxication delirium",
  },
  {
    code: "F15.222",
    desc: "Other stimulant dependence with intoxication with perceptual disturbance",
  },
  {
    code: "F15.229",
    desc: "Other stimulant dependence with intoxication, unspecified",
  },
  {
    code: "F15.250",
    desc: "Other stimulant dependence with stimulant-induced psychotic disorder with delusions",
  },
  {
    code: "F15.251",
    desc: "Other stimulant dependence with stimulant-induced psychotic disorder with hallucinations",
  },
  {
    code: "F15.259",
    desc: "Other stimulant dependence with stimulant-induced psychotic disorder, unspecified",
  },
  {
    code: "F15.280",
    desc: "Other stimulant dependence with stimulant-induced anxiety disorder",
  },
  {
    code: "F15.281",
    desc: "Other stimulant dependence with stimulant-induced sexual dysfunction",
  },
  {
    code: "F15.282",
    desc: "Other stimulant dependence with stimulant-induced sleep disorder",
  },
  {
    code: "F15.288",
    desc: "Other stimulant dependence with other stimulant-induced disorder",
  },
  { code: "F15.90", desc: "Other stimulant use, unspecified, uncomplicated" },
  {
    code: "F15.92",
    desc: "Other stimulant use, unspecified with intoxication",
  },
  { code: "F15.93", desc: "Other stimulant use, unspecified with withdrawal" },
  {
    code: "F15.94",
    desc: "Other stimulant use, unspecified with stimulant-induced mood disorder",
  },
  {
    code: "F15.95",
    desc: "Other stimulant use, unspecified with stimulant-induced psychotic disorder",
  },
  {
    code: "F15.98",
    desc: "Other stimulant use, unspecified with other stimulant-induced disorder",
  },
  {
    code: "F15.99",
    desc: "Other stimulant use, unspecified with unspecified stimulant-induced disorder",
  },
  {
    code: "F15.920",
    desc: "Other stimulant use, unspecified with intoxication, uncomplicated",
  },
  {
    code: "F15.921",
    desc: "Other stimulant use, unspecified with intoxication delirium",
  },
  {
    code: "F15.922",
    desc: "Other stimulant use, unspecified with intoxication with perceptual disturbance",
  },
  {
    code: "F15.929",
    desc: "Other stimulant use, unspecified with intoxication, unspecified",
  },
  {
    code: "F15.950",
    desc: "Other stimulant use, unspecified with stimulant-induced psychotic disorder with delusions",
  },
  {
    code: "F15.951",
    desc: "Other stimulant use, unspecified with stimulant-induced psychotic disorder with hallucinations",
  },
  {
    code: "F15.959",
    desc: "Other stimulant use, unspecified with stimulant-induced psychotic disorder, unspecified",
  },
  {
    code: "F15.980",
    desc: "Other stimulant use, unspecified with stimulant-induced anxiety disorder",
  },
  {
    code: "F15.981",
    desc: "Other stimulant use, unspecified with stimulant-induced sexual dysfunction",
  },
  {
    code: "F15.982",
    desc: "Other stimulant use, unspecified with stimulant-induced sleep disorder",
  },
  {
    code: "F15.988",
    desc: "Other stimulant use, unspecified with other stimulant-induced disorder",
  },
  { code: "F16.1", desc: "Hallucinogen abuse" },
  { code: "F16.2", desc: "Hallucinogen dependence" },
  { code: "F16.9", desc: "Hallucinogen use, unspecified" },
  { code: "F16.10", desc: "Hallucinogen abuse, uncomplicated" },
  { code: "F16.11", desc: "Hallucinogen abuse, in remission" },
  { code: "F16.12", desc: "Hallucinogen abuse with intoxication" },
  {
    code: "F16.14",
    desc: "Hallucinogen abuse with hallucinogen-induced mood disorder",
  },
  {
    code: "F16.15",
    desc: "Hallucinogen abuse with hallucinogen-induced psychotic disorder",
  },
  {
    code: "F16.18",
    desc: "Hallucinogen abuse with other hallucinogen-induced disorder",
  },
  {
    code: "F16.19",
    desc: "Hallucinogen abuse with unspecified hallucinogen-induced disorder",
  },
  {
    code: "F16.120",
    desc: "Hallucinogen abuse with intoxication, uncomplicated",
  },
  {
    code: "F16.121",
    desc: "Hallucinogen abuse with intoxication with delirium",
  },
  {
    code: "F16.122",
    desc: "Hallucinogen abuse with intoxication with perceptual disturbance",
  },
  {
    code: "F16.129",
    desc: "Hallucinogen abuse with intoxication, unspecified",
  },
  {
    code: "F16.150",
    desc: "Hallucinogen abuse with hallucinogen-induced psychotic disorder with delusions",
  },
  {
    code: "F16.151",
    desc: "Hallucinogen abuse with hallucinogen-induced psychotic disorder with hallucinations",
  },
  {
    code: "F16.159",
    desc: "Hallucinogen abuse with hallucinogen-induced psychotic disorder, unspecified",
  },
  {
    code: "F16.180",
    desc: "Hallucinogen abuse with hallucinogen-induced anxiety disorder",
  },
  {
    code: "F16.183",
    desc: "Hallucinogen abuse with hallucinogen persisting perception disorder (flashbacks)",
  },
  {
    code: "F16.188",
    desc: "Hallucinogen abuse with other hallucinogen-induced disorder",
  },
  { code: "F16.20", desc: "Hallucinogen dependence, uncomplicated" },
  { code: "F16.21", desc: "Hallucinogen dependence, in remission" },
  { code: "F16.22", desc: "Hallucinogen dependence with intoxication" },
  {
    code: "F16.24",
    desc: "Hallucinogen dependence with hallucinogen-induced mood disorder",
  },
  {
    code: "F16.25",
    desc: "Hallucinogen dependence with hallucinogen-induced psychotic disorder",
  },
  {
    code: "F16.28",
    desc: "Hallucinogen dependence with other hallucinogen-induced disorder",
  },
  {
    code: "F16.29",
    desc: "Hallucinogen dependence with unspecified hallucinogen-induced disorder",
  },
  {
    code: "F16.220",
    desc: "Hallucinogen dependence with intoxication, uncomplicated",
  },
  {
    code: "F16.221",
    desc: "Hallucinogen dependence with intoxication with delirium",
  },
  {
    code: "F16.229",
    desc: "Hallucinogen dependence with intoxication, unspecified",
  },
  {
    code: "F16.250",
    desc: "Hallucinogen dependence with hallucinogen-induced psychotic disorder with delusions",
  },
  {
    code: "F16.251",
    desc: "Hallucinogen dependence with hallucinogen-induced psychotic disorder with hallucinations",
  },
  {
    code: "F16.259",
    desc: "Hallucinogen dependence with hallucinogen-induced psychotic disorder, unspecified",
  },
  {
    code: "F16.280",
    desc: "Hallucinogen dependence with hallucinogen-induced anxiety disorder",
  },
  {
    code: "F16.283",
    desc: "Hallucinogen dependence with hallucinogen persisting perception disorder (flashbacks)",
  },
  {
    code: "F16.288",
    desc: "Hallucinogen dependence with other hallucinogen-induced disorder",
  },
  { code: "F16.90", desc: "Hallucinogen use, unspecified, uncomplicated" },
  { code: "F16.92", desc: "Hallucinogen use, unspecified with intoxication" },
  {
    code: "F16.94",
    desc: "Hallucinogen use, unspecified with hallucinogen-induced mood disorder",
  },
  {
    code: "F16.95",
    desc: "Hallucinogen use, unspecified with hallucinogen-induced psychotic disorder",
  },
  {
    code: "F16.98",
    desc: "Hallucinogen use, unspecified with other specified hallucinogen-induced disorder",
  },
  {
    code: "F16.99",
    desc: "Hallucinogen use, unspecified with unspecified hallucinogen-induced disorder",
  },
  {
    code: "F16.920",
    desc: "Hallucinogen use, unspecified with intoxication, uncomplicated",
  },
  {
    code: "F16.921",
    desc: "Hallucinogen use, unspecified with intoxication with delirium",
  },
  {
    code: "F16.929",
    desc: "Hallucinogen use, unspecified with intoxication, unspecified",
  },
  {
    code: "F16.950",
    desc: "Hallucinogen use, unspecified with hallucinogen-induced psychotic disorder with delusions",
  },
  {
    code: "F16.951",
    desc: "Hallucinogen use, unspecified with hallucinogen-induced psychotic disorder with hallucinations",
  },
  {
    code: "F16.959",
    desc: "Hallucinogen use, unspecified with hallucinogen-induced psychotic disorder, unspecified",
  },
  {
    code: "F16.980",
    desc: "Hallucinogen use, unspecified with hallucinogen-induced anxiety disorder",
  },
  {
    code: "F16.983",
    desc: "Hallucinogen use, unspecified with hallucinogen persisting perception disorder (flashbacks)",
  },
  {
    code: "F16.988",
    desc: "Hallucinogen use, unspecified with other hallucinogen-induced disorder",
  },
  { code: "F17.2", desc: "Nicotine dependence" },
  { code: "F17.20", desc: "Nicotine dependence, unspecified" },
  { code: "F17.21", desc: "Nicotine dependence, cigarettes" },
  { code: "F17.22", desc: "Nicotine dependence, chewing tobacco" },
  { code: "F17.29", desc: "Nicotine dependence, other tobacco product" },
  { code: "F17.200", desc: "Nicotine dependence, unspecified, uncomplicated" },
  { code: "F17.201", desc: "Nicotine dependence, unspecified, in remission" },
  { code: "F17.203", desc: "Nicotine dependence unspecified, with withdrawal" },
  {
    code: "F17.208",
    desc: "Nicotine dependence, unspecified, with other nicotine-induced disorders",
  },
  {
    code: "F17.209",
    desc: "Nicotine dependence, unspecified, with unspecified nicotine-induced disorders",
  },
  { code: "F17.210", desc: "Nicotine dependence, cigarettes, uncomplicated" },
  { code: "F17.211", desc: "Nicotine dependence, cigarettes, in remission" },
  { code: "F17.213", desc: "Nicotine dependence, cigarettes, with withdrawal" },
  {
    code: "F17.218",
    desc: "Nicotine dependence, cigarettes, with other nicotine-induced disorders",
  },
  {
    code: "F17.219",
    desc: "Nicotine dependence, cigarettes, with unspecified nicotine-induced disorders",
  },
  {
    code: "F17.220",
    desc: "Nicotine dependence, chewing tobacco, uncomplicated",
  },
  {
    code: "F17.221",
    desc: "Nicotine dependence, chewing tobacco, in remission",
  },
  {
    code: "F17.223",
    desc: "Nicotine dependence, chewing tobacco, with withdrawal",
  },
  {
    code: "F17.228",
    desc: "Nicotine dependence, chewing tobacco, with other nicotine-induced disorders",
  },
  {
    code: "F17.229",
    desc: "Nicotine dependence, chewing tobacco, with unspecified nicotine-induced disorders",
  },
  {
    code: "F17.290",
    desc: "Nicotine dependence, other tobacco product, uncomplicated",
  },
  {
    code: "F17.291",
    desc: "Nicotine dependence, other tobacco product, in remission",
  },
  {
    code: "F17.293",
    desc: "Nicotine dependence, other tobacco product, with withdrawal",
  },
  {
    code: "F17.298",
    desc: "Nicotine dependence, other tobacco product, with other nicotine-induced disorders",
  },
  {
    code: "F17.299",
    desc: "Nicotine dependence, other tobacco product, with unspecified nicotine-induced disorders",
  },
  { code: "F18.1", desc: "Inhalant abuse" },
  { code: "F18.2", desc: "Inhalant dependence" },
  { code: "F18.9", desc: "Inhalant use, unspecified" },
  { code: "F18.10", desc: "Inhalant abuse, uncomplicated" },
  { code: "F18.11", desc: "Inhalant abuse, in remission" },
  { code: "F18.12", desc: "Inhalant abuse with intoxication" },
  {
    code: "F18.14",
    desc: "Inhalant abuse with inhalant-induced mood disorder",
  },
  {
    code: "F18.15",
    desc: "Inhalant abuse with inhalant-induced psychotic disorder",
  },
  { code: "F18.17", desc: "Inhalant abuse with inhalant-induced dementia" },
  {
    code: "F18.18",
    desc: "Inhalant abuse with other inhalant-induced disorders",
  },
  {
    code: "F18.19",
    desc: "Inhalant abuse with unspecified inhalant-induced disorder",
  },
  { code: "F18.120", desc: "Inhalant abuse with intoxication, uncomplicated" },
  { code: "F18.121", desc: "Inhalant abuse with intoxication delirium" },
  { code: "F18.129", desc: "Inhalant abuse with intoxication, unspecified" },
  {
    code: "F18.150",
    desc: "Inhalant abuse with inhalant-induced psychotic disorder with delusions",
  },
  {
    code: "F18.151",
    desc: "Inhalant abuse with inhalant-induced psychotic disorder with hallucinations",
  },
  {
    code: "F18.159",
    desc: "Inhalant abuse with inhalant-induced psychotic disorder, unspecified",
  },
  {
    code: "F18.180",
    desc: "Inhalant abuse with inhalant-induced anxiety disorder",
  },
  {
    code: "F18.188",
    desc: "Inhalant abuse with other inhalant-induced disorder",
  },
  { code: "F18.20", desc: "Inhalant dependence, uncomplicated" },
  { code: "F18.21", desc: "Inhalant dependence, in remission" },
  { code: "F18.22", desc: "Inhalant dependence with intoxication" },
  {
    code: "F18.24",
    desc: "Inhalant dependence with inhalant-induced mood disorder",
  },
  {
    code: "F18.25",
    desc: "Inhalant dependence with inhalant-induced psychotic disorder",
  },
  {
    code: "F18.27",
    desc: "Inhalant dependence with inhalant-induced dementia",
  },
  {
    code: "F18.28",
    desc: "Inhalant dependence with other inhalant-induced disorders",
  },
  {
    code: "F18.29",
    desc: "Inhalant dependence with unspecified inhalant-induced disorder",
  },
  {
    code: "F18.220",
    desc: "Inhalant dependence with intoxication, uncomplicated",
  },
  { code: "F18.221", desc: "Inhalant dependence with intoxication delirium" },
  {
    code: "F18.229",
    desc: "Inhalant dependence with intoxication, unspecified",
  },
  {
    code: "F18.250",
    desc: "Inhalant dependence with inhalant-induced psychotic disorder with delusions",
  },
  {
    code: "F18.251",
    desc: "Inhalant dependence with inhalant-induced psychotic disorder with hallucinations",
  },
  {
    code: "F18.259",
    desc: "Inhalant dependence with inhalant-induced psychotic disorder, unspecified",
  },
  {
    code: "F18.280",
    desc: "Inhalant dependence with inhalant-induced anxiety disorder",
  },
  {
    code: "F18.288",
    desc: "Inhalant dependence with other inhalant-induced disorder",
  },
  { code: "F18.90", desc: "Inhalant use, unspecified, uncomplicated" },
  { code: "F18.92", desc: "Inhalant use, unspecified with intoxication" },
  {
    code: "F18.94",
    desc: "Inhalant use, unspecified with inhalant-induced mood disorder",
  },
  {
    code: "F18.95",
    desc: "Inhalant use, unspecified with inhalant-induced psychotic disorder",
  },
  {
    code: "F18.97",
    desc: "Inhalant use, unspecified with inhalant-induced persisting dementia",
  },
  {
    code: "F18.98",
    desc: "Inhalant use, unspecified with other inhalant-induced disorders",
  },
  {
    code: "F18.99",
    desc: "Inhalant use, unspecified with unspecified inhalant-induced disorder",
  },
  {
    code: "F18.920",
    desc: "Inhalant use, unspecified with intoxication, uncomplicated",
  },
  {
    code: "F18.921",
    desc: "Inhalant use, unspecified with intoxication with delirium",
  },
  {
    code: "F18.929",
    desc: "Inhalant use, unspecified with intoxication, unspecified",
  },
  {
    code: "F18.950",
    desc: "Inhalant use, unspecified with inhalant-induced psychotic disorder with delusions",
  },
  {
    code: "F18.951",
    desc: "Inhalant use, unspecified with inhalant-induced psychotic disorder with hallucinations",
  },
  {
    code: "F18.959",
    desc: "Inhalant use, unspecified with inhalant-induced psychotic disorder, unspecified",
  },
  {
    code: "F18.980",
    desc: "Inhalant use, unspecified with inhalant-induced anxiety disorder",
  },
  {
    code: "F18.988",
    desc: "Inhalant use, unspecified with other inhalant-induced disorder",
  },
  { code: "F19.1", desc: "Other psychoactive substance abuse" },
  { code: "F19.2", desc: "Other psychoactive substance dependence" },
  { code: "F19.9", desc: "Other psychoactive substance use, unspecified" },
  { code: "F19.10", desc: "Other psychoactive substance abuse, uncomplicated" },
  { code: "F19.11", desc: "Other psychoactive substance abuse, in remission" },
  {
    code: "F19.12",
    desc: "Other psychoactive substance abuse with intoxication",
  },
  {
    code: "F19.13",
    desc: "Other psychoactive substance abuse with withdrawal",
  },
  {
    code: "F19.14",
    desc: "Other psychoactive substance abuse with psychoactive substance-induced mood disorder",
  },
  {
    code: "F19.15",
    desc: "Other psychoactive substance abuse with psychoactive substance-induced psychotic disorder",
  },
  {
    code: "F19.16",
    desc: "Other psychoactive substance abuse with psychoactive substance-induced persisting amnestic disorder",
  },
  {
    code: "F19.17",
    desc: "Other psychoactive substance abuse with psychoactive substance-induced persisting dementia",
  },
  {
    code: "F19.18",
    desc: "Other psychoactive substance abuse with other psychoactive substance-induced disorders",
  },
  {
    code: "F19.19",
    desc: "Other psychoactive substance abuse with unspecified psychoactive substance-induced disorder",
  },
  {
    code: "F19.120",
    desc: "Other psychoactive substance abuse with intoxication, uncomplicated",
  },
  {
    code: "F19.121",
    desc: "Other psychoactive substance abuse with intoxication delirium",
  },
  {
    code: "F19.122",
    desc: "Other psychoactive substance abuse with intoxication with perceptual disturbances",
  },
  {
    code: "F19.129",
    desc: "Other psychoactive substance abuse with intoxication, unspecified",
  },
  {
    code: "F19.130",
    desc: "Other psychoactive substance abuse with withdrawal, uncomplicated",
  },
  {
    code: "F19.131",
    desc: "Other psychoactive substance abuse with withdrawal delirium",
  },
  {
    code: "F19.132",
    desc: "Other psychoactive substance abuse with withdrawal with perceptual disturbance",
  },
  {
    code: "F19.139",
    desc: "Other psychoactive substance abuse with withdrawal, unspecified",
  },
  {
    code: "F19.150",
    desc: "Other psychoactive substance abuse with psychoactive substance-induced psychotic disorder with delusions",
  },
  {
    code: "F19.151",
    desc: "Other psychoactive substance abuse with psychoactive substance-induced psychotic disorder with hallucinations",
  },
  {
    code: "F19.159",
    desc: "Other psychoactive substance abuse with psychoactive substance-induced psychotic disorder, unspecified",
  },
  {
    code: "F19.180",
    desc: "Other psychoactive substance abuse with psychoactive substance-induced anxiety disorder",
  },
  {
    code: "F19.181",
    desc: "Other psychoactive substance abuse with psychoactive substance-induced sexual dysfunction",
  },
  {
    code: "F19.182",
    desc: "Other psychoactive substance abuse with psychoactive substance-induced sleep disorder",
  },
  {
    code: "F19.188",
    desc: "Other psychoactive substance abuse with other psychoactive substance-induced disorder",
  },
  {
    code: "F19.20",
    desc: "Other psychoactive substance dependence, uncomplicated",
  },
  {
    code: "F19.21",
    desc: "Other psychoactive substance dependence, in remission",
  },
  {
    code: "F19.22",
    desc: "Other psychoactive substance dependence with intoxication",
  },
  {
    code: "F19.23",
    desc: "Other psychoactive substance dependence with withdrawal",
  },
  {
    code: "F19.24",
    desc: "Other psychoactive substance dependence with psychoactive substance-induced mood disorder",
  },
  {
    code: "F19.25",
    desc: "Other psychoactive substance dependence with psychoactive substance-induced psychotic disorder",
  },
  {
    code: "F19.26",
    desc: "Other psychoactive substance dependence with psychoactive substance-induced persisting amnestic disorder",
  },
  {
    code: "F19.27",
    desc: "Other psychoactive substance dependence with psychoactive substance-induced persisting dementia",
  },
  {
    code: "F19.28",
    desc: "Other psychoactive substance dependence with other psychoactive substance-induced disorders",
  },
  {
    code: "F19.29",
    desc: "Other psychoactive substance dependence with unspecified psychoactive substance-induced disorder",
  },
  {
    code: "F19.220",
    desc: "Other psychoactive substance dependence with intoxication, uncomplicated",
  },
  {
    code: "F19.221",
    desc: "Other psychoactive substance dependence with intoxication delirium",
  },
  {
    code: "F19.222",
    desc: "Other psychoactive substance dependence with intoxication with perceptual disturbance",
  },
  {
    code: "F19.229",
    desc: "Other psychoactive substance dependence with intoxication, unspecified",
  },
  {
    code: "F19.230",
    desc: "Other psychoactive substance dependence with withdrawal, uncomplicated",
  },
  {
    code: "F19.231",
    desc: "Other psychoactive substance dependence with withdrawal delirium",
  },
  {
    code: "F19.232",
    desc: "Other psychoactive substance dependence with withdrawal with perceptual disturbance",
  },
  {
    code: "F19.239",
    desc: "Other psychoactive substance dependence with withdrawal, unspecified",
  },
  {
    code: "F19.250",
    desc: "Other psychoactive substance dependence with psychoactive substance-induced psychotic disorder with delusions",
  },
  {
    code: "F19.251",
    desc: "Other psychoactive substance dependence with psychoactive substance-induced psychotic disorder with hallucinations",
  },
  {
    code: "F19.259",
    desc: "Other psychoactive substance dependence with psychoactive substance-induced psychotic disorder, unspecified",
  },
  {
    code: "F19.280",
    desc: "Other psychoactive substance dependence with psychoactive substance-induced anxiety disorder",
  },
  {
    code: "F19.281",
    desc: "Other psychoactive substance dependence with psychoactive substance-induced sexual dysfunction",
  },
  {
    code: "F19.282",
    desc: "Other psychoactive substance dependence with psychoactive substance-induced sleep disorder",
  },
  {
    code: "F19.288",
    desc: "Other psychoactive substance dependence with other psychoactive substance-induced disorder",
  },
  {
    code: "F19.90",
    desc: "Other psychoactive substance use, unspecified, uncomplicated",
  },
  {
    code: "F19.92",
    desc: "Other psychoactive substance use, unspecified with intoxication",
  },
  {
    code: "F19.93",
    desc: "Other psychoactive substance use, unspecified with withdrawal",
  },
  {
    code: "F19.94",
    desc: "Other psychoactive substance use, unspecified with psychoactive substance-induced mood disorder",
  },
  {
    code: "F19.95",
    desc: "Other psychoactive substance use, unspecified with psychoactive substance-induced psychotic disorder",
  },
  {
    code: "F19.96",
    desc: "Other psychoactive substance use, unspecified with psychoactive substance-induced persisting amnestic disorder",
  },
  {
    code: "F19.97",
    desc: "Other psychoactive substance use, unspecified with psychoactive substance-induced persisting dementia",
  },
  {
    code: "F19.98",
    desc: "Other psychoactive substance use, unspecified with other psychoactive substance-induced disorders",
  },
  {
    code: "F19.99",
    desc: "Other psychoactive substance use, unspecified with unspecified psychoactive substance-induced disorder",
  },
  {
    code: "F19.920",
    desc: "Other psychoactive substance use, unspecified with intoxication, uncomplicated",
  },
  {
    code: "F19.921",
    desc: "Other psychoactive substance use, unspecified with intoxication with delirium",
  },
  {
    code: "F19.922",
    desc: "Other psychoactive substance use, unspecified with intoxication with perceptual disturbance",
  },
  {
    code: "F19.929",
    desc: "Other psychoactive substance use, unspecified with intoxication, unspecified",
  },
  {
    code: "F19.930",
    desc: "Other psychoactive substance use, unspecified with withdrawal, uncomplicated",
  },
  {
    code: "F19.931",
    desc: "Other psychoactive substance use, unspecified with withdrawal delirium",
  },
  {
    code: "F19.932",
    desc: "Other psychoactive substance use, unspecified with withdrawal with perceptual disturbance",
  },
  {
    code: "F19.939",
    desc: "Other psychoactive substance use, unspecified with withdrawal, unspecified",
  },
  {
    code: "F19.950",
    desc: "Other psychoactive substance use, unspecified with psychoactive substance-induced psychotic disorder with delusions",
  },
  {
    code: "F19.951",
    desc: "Other psychoactive substance use, unspecified with psychoactive substance-induced psychotic disorder with hallucinations",
  },
  {
    code: "F19.959",
    desc: "Other psychoactive substance use, unspecified with psychoactive substance-induced psychotic disorder, unspecified",
  },
  {
    code: "F19.980",
    desc: "Other psychoactive substance use, unspecified with psychoactive substance-induced anxiety disorder",
  },
  {
    code: "F19.981",
    desc: "Other psychoactive substance use, unspecified with psychoactive substance-induced sexual dysfunction",
  },
  {
    code: "F19.982",
    desc: "Other psychoactive substance use, unspecified with psychoactive substance-induced sleep disorder",
  },
  {
    code: "F19.988",
    desc: "Other psychoactive substance use, unspecified with other psychoactive substance-induced disorder",
  },
  { code: "F20", desc: "Schizophrenia" },
  { code: "F21", desc: "Schizotypal disorder" },
  { code: "F22", desc: "Delusional disorders" },
  { code: "F23", desc: "Brief psychotic disorder" },
  { code: "F24", desc: "Shared psychotic disorder" },
  { code: "F25", desc: "Schizoaffective disorders" },
  {
    code: "F28",
    desc: "Other psychotic disorder not due to a substance or known physiological condition",
  },
  {
    code: "F29",
    desc: "Unspecified psychosis not due to a substance or known physiological condition",
  },
  { code: "F20.0", desc: "Paranoid schizophrenia" },
  { code: "F20.1", desc: "Disorganized schizophrenia" },
  { code: "F20.2", desc: "Catatonic schizophrenia" },
  { code: "F20.3", desc: "Undifferentiated schizophrenia" },
  { code: "F20.5", desc: "Residual schizophrenia" },
  { code: "F20.8", desc: "Other schizophrenia" },
  { code: "F20.9", desc: "Schizophrenia, unspecified" },
  { code: "F20.81", desc: "Schizophreniform disorder" },
  { code: "F20.89", desc: "Other schizophrenia" },
  { code: "F25.0", desc: "Schizoaffective disorder, bipolar type" },
  { code: "F25.1", desc: "Schizoaffective disorder, depressive type" },
  { code: "F25.8", desc: "Other schizoaffective disorders" },
  { code: "F25.9", desc: "Schizoaffective disorder, unspecified" },
  { code: "F30", desc: "Manic episode" },
  { code: "F31", desc: "Bipolar disorder" },
  { code: "F32", desc: "Major depressive disorder, single episode" },
  { code: "F33", desc: "Major depressive disorder, recurrent" },
  { code: "F34", desc: "Persistent mood [affective] disorders" },
  { code: "F39", desc: "Unspecified mood [affective] disorder" },
  { code: "F30.1", desc: "Manic episode without psychotic symptoms" },
  { code: "F30.2", desc: "Manic episode, severe with psychotic symptoms" },
  { code: "F30.3", desc: "Manic episode in partial remission" },
  { code: "F30.4", desc: "Manic episode in full remission" },
  { code: "F30.8", desc: "Other manic episodes" },
  { code: "F30.9", desc: "Manic episode, unspecified" },
  {
    code: "F30.10",
    desc: "Manic episode without psychotic symptoms, unspecified",
  },
  { code: "F30.11", desc: "Manic episode without psychotic symptoms, mild" },
  {
    code: "F30.12",
    desc: "Manic episode without psychotic symptoms, moderate",
  },
  { code: "F30.13", desc: "Manic episode, severe, without psychotic symptoms" },
  { code: "F31.0", desc: "Bipolar disorder, current episode hypomanic" },
  {
    code: "F31.1",
    desc: "Bipolar disorder, current episode manic without psychotic features",
  },
  {
    code: "F31.2",
    desc: "Bipolar disorder, current episode manic severe with psychotic features",
  },
  {
    code: "F31.3",
    desc: "Bipolar disorder, current episode depressed, mild or moderate severity",
  },
  {
    code: "F31.4",
    desc: "Bipolar disorder, current episode depressed, severe, without psychotic features",
  },
  {
    code: "F31.5",
    desc: "Bipolar disorder, current episode depressed, severe, with psychotic features",
  },
  { code: "F31.6", desc: "Bipolar disorder, current episode mixed" },
  { code: "F31.7", desc: "Bipolar disorder, currently in remission" },
  { code: "F31.8", desc: "Other bipolar disorders" },
  { code: "F31.9", desc: "Bipolar disorder, unspecified" },
  {
    code: "F31.10",
    desc: "Bipolar disorder, current episode manic without psychotic features, unspecified",
  },
  {
    code: "F31.11",
    desc: "Bipolar disorder, current episode manic without psychotic features, mild",
  },
  {
    code: "F31.12",
    desc: "Bipolar disorder, current episode manic without psychotic features, moderate",
  },
  {
    code: "F31.13",
    desc: "Bipolar disorder, current episode manic without psychotic features, severe",
  },
  {
    code: "F31.30",
    desc: "Bipolar disorder, current episode depressed, mild or moderate severity, unspecified",
  },
  { code: "F31.31", desc: "Bipolar disorder, current episode depressed, mild" },
  {
    code: "F31.32",
    desc: "Bipolar disorder, current episode depressed, moderate",
  },
  {
    code: "F31.60",
    desc: "Bipolar disorder, current episode mixed, unspecified",
  },
  { code: "F31.61", desc: "Bipolar disorder, current episode mixed, mild" },
  { code: "F31.62", desc: "Bipolar disorder, current episode mixed, moderate" },
  {
    code: "F31.63",
    desc: "Bipolar disorder, current episode mixed, severe, without psychotic features",
  },
  {
    code: "F31.64",
    desc: "Bipolar disorder, current episode mixed, severe, with psychotic features",
  },
  {
    code: "F31.70",
    desc: "Bipolar disorder, currently in remission, most recent episode unspecified",
  },
  {
    code: "F31.71",
    desc: "Bipolar disorder, in partial remission, most recent episode hypomanic",
  },
  {
    code: "F31.72",
    desc: "Bipolar disorder, in full remission, most recent episode hypomanic",
  },
  {
    code: "F31.73",
    desc: "Bipolar disorder, in partial remission, most recent episode manic",
  },
  {
    code: "F31.74",
    desc: "Bipolar disorder, in full remission, most recent episode manic",
  },
  {
    code: "F31.75",
    desc: "Bipolar disorder, in partial remission, most recent episode depressed",
  },
  {
    code: "F31.76",
    desc: "Bipolar disorder, in full remission, most recent episode depressed",
  },
  {
    code: "F31.77",
    desc: "Bipolar disorder, in partial remission, most recent episode mixed",
  },
  {
    code: "F31.78",
    desc: "Bipolar disorder, in full remission, most recent episode mixed",
  },
  { code: "F31.81", desc: "Bipolar II disorder" },
  { code: "F31.89", desc: "Other bipolar disorder" },
  { code: "F32.0", desc: "Major depressive disorder, single episode, mild" },
  {
    code: "F32.1",
    desc: "Major depressive disorder, single episode, moderate",
  },
  {
    code: "F32.2",
    desc: "Major depressive disorder, single episode, severe without psychotic features",
  },
  {
    code: "F32.3",
    desc: "Major depressive disorder, single episode, severe with psychotic features",
  },
  {
    code: "F32.4",
    desc: "Major depressive disorder, single episode, in partial remission",
  },
  {
    code: "F32.5",
    desc: "Major depressive disorder, single episode, in full remission",
  },
  { code: "F32.8", desc: "Other depressive episodes" },
  {
    code: "F32.9",
    desc: "Major depressive disorder, single episode, unspecified",
  },
  { code: "F32.81", desc: "Premenstrual dysphoric disorder" },
  { code: "F32.89", desc: "Other specified depressive episodes" },
  { code: "F33.0", desc: "Major depressive disorder, recurrent, mild" },
  { code: "F33.1", desc: "Major depressive disorder, recurrent, moderate" },
  {
    code: "F33.2",
    desc: "Major depressive disorder, recurrent severe without psychotic features",
  },
  {
    code: "F33.3",
    desc: "Major depressive disorder, recurrent, severe with psychotic symptoms",
  },
  { code: "F33.4", desc: "Major depressive disorder, recurrent, in remission" },
  { code: "F33.8", desc: "Other recurrent depressive disorders" },
  { code: "F33.9", desc: "Major depressive disorder, recurrent, unspecified" },
  {
    code: "F33.40",
    desc: "Major depressive disorder, recurrent, in remission, unspecified",
  },
  {
    code: "F33.41",
    desc: "Major depressive disorder, recurrent, in partial remission",
  },
  {
    code: "F33.42",
    desc: "Major depressive disorder, recurrent, in full remission",
  },
  { code: "F34.0", desc: "Cyclothymic disorder" },
  { code: "F34.1", desc: "Dysthymic disorder" },
  { code: "F34.8", desc: "Other persistent mood [affective] disorders" },
  { code: "F34.9", desc: "Persistent mood [affective] disorder, unspecified" },
  { code: "F34.81", desc: "Disruptive mood dysregulation disorder" },
  { code: "F34.89", desc: "Other specified persistent mood disorders" },
  { code: "F40", desc: "Phobic anxiety disorders" },
  { code: "F41", desc: "Other anxiety disorders" },
  { code: "F42", desc: "Obsessive-compulsive disorder" },
  { code: "F43", desc: "Reaction to severe stress, and adjustment disorders" },
  { code: "F44", desc: "Dissociative and conversion disorders" },
  { code: "F45", desc: "Somatoform disorders" },
  { code: "F48", desc: "Other nonpsychotic mental disorders" },
  { code: "F40.0", desc: "Agoraphobia" },
  { code: "F40.1", desc: "Social phobias" },
  { code: "F40.2", desc: "Specific (isolated) phobias" },
  { code: "F40.8", desc: "Other phobic anxiety disorders" },
  { code: "F40.9", desc: "Phobic anxiety disorder, unspecified" },
  { code: "F40.00", desc: "Agoraphobia, unspecified" },
  { code: "F40.01", desc: "Agoraphobia with panic disorder" },
  { code: "F40.02", desc: "Agoraphobia without panic disorder" },
  { code: "F40.10", desc: "Social phobia, unspecified" },
  { code: "F40.11", desc: "Social phobia, generalized" },
  { code: "F40.21", desc: "Animal type phobia" },
  { code: "F40.22", desc: "Natural environment type phobia" },
  { code: "F40.23", desc: "Blood, injection, injury type phobia" },
  { code: "F40.24", desc: "Situational type phobia" },
  { code: "F40.29", desc: "Other specified phobia" },
  { code: "F40.210", desc: "Arachnophobia" },
  { code: "F40.218", desc: "Other animal type phobia" },
  { code: "F40.220", desc: "Fear of thunderstorms" },
  { code: "F40.228", desc: "Other natural environment type phobia" },
  { code: "F40.230", desc: "Fear of blood" },
  { code: "F40.231", desc: "Fear of injections and transfusions" },
  { code: "F40.232", desc: "Fear of other medical care" },
  { code: "F40.233", desc: "Fear of injury" },
  { code: "F40.240", desc: "Claustrophobia" },
  { code: "F40.241", desc: "Acrophobia" },
  { code: "F40.242", desc: "Fear of bridges" },
  { code: "F40.243", desc: "Fear of flying" },
  { code: "F40.248", desc: "Other situational type phobia" },
  { code: "F40.290", desc: "Androphobia" },
  { code: "F40.291", desc: "Gynephobia" },
  { code: "F40.298", desc: "Other specified phobia" },
  { code: "F41.0", desc: "Panic disorder [episodic paroxysmal anxiety]" },
  { code: "F41.1", desc: "Generalized anxiety disorder" },
  { code: "F41.3", desc: "Other mixed anxiety disorders" },
  { code: "F41.8", desc: "Other specified anxiety disorders" },
  { code: "F41.9", desc: "Anxiety disorder, unspecified" },
  { code: "F42.2", desc: "Mixed obsessional thoughts and acts" },
  { code: "F42.3", desc: "Hoarding disorder" },
  { code: "F42.4", desc: "Excoriation (skin-picking) disorder" },
  { code: "F42.8", desc: "Other obsessive-compulsive disorder" },
  { code: "F42.9", desc: "Obsessive-compulsive disorder, unspecified" },
  { code: "F43.0", desc: "Acute stress reaction" },
  { code: "F43.1", desc: "Post-traumatic stress disorder (PTSD)" },
  { code: "F43.2", desc: "Adjustment disorders" },
  { code: "F43.8", desc: "Other reactions to severe stress" },
  { code: "F43.9", desc: "Reaction to severe stress, unspecified" },
  { code: "F43.10", desc: "Post-traumatic stress disorder, unspecified" },
  { code: "F43.11", desc: "Post-traumatic stress disorder, acute" },
  { code: "F43.12", desc: "Post-traumatic stress disorder, chronic" },
  { code: "F43.20", desc: "Adjustment disorder, unspecified" },
  { code: "F43.21", desc: "Adjustment disorder with depressed mood" },
  { code: "F43.22", desc: "Adjustment disorder with anxiety" },
  {
    code: "F43.23",
    desc: "Adjustment disorder with mixed anxiety and depressed mood",
  },
  { code: "F43.24", desc: "Adjustment disorder with disturbance of conduct" },
  {
    code: "F43.25",
    desc: "Adjustment disorder with mixed disturbance of emotions and conduct",
  },
  { code: "F43.29", desc: "Adjustment disorder with other symptoms" },
  { code: "F44.0", desc: "Dissociative amnesia" },
  { code: "F44.1", desc: "Dissociative fugue" },
  { code: "F44.2", desc: "Dissociative stupor" },
  { code: "F44.4", desc: "Conversion disorder with motor symptom or deficit" },
  { code: "F44.5", desc: "Conversion disorder with seizures or convulsions" },
  {
    code: "F44.6",
    desc: "Conversion disorder with sensory symptom or deficit",
  },
  {
    code: "F44.7",
    desc: "Conversion disorder with mixed symptom presentation",
  },
  { code: "F44.8", desc: "Other dissociative and conversion disorders" },
  { code: "F44.9", desc: "Dissociative and conversion disorder, unspecified" },
  { code: "F44.81", desc: "Dissociative identity disorder" },
  { code: "F44.89", desc: "Other dissociative and conversion disorders" },
  { code: "F45.0", desc: "Somatization disorder" },
  { code: "F45.1", desc: "Undifferentiated somatoform disorder" },
  { code: "F45.2", desc: "Hypochondriacal disorders" },
  { code: "F45.4", desc: "Pain disorders related to psychological factors" },
  { code: "F45.8", desc: "Other somatoform disorders" },
  { code: "F45.9", desc: "Somatoform disorder, unspecified" },
  { code: "F45.20", desc: "Hypochondriacal disorder, unspecified" },
  { code: "F45.21", desc: "Hypochondriasis" },
  { code: "F45.22", desc: "Body dysmorphic disorder" },
  { code: "F45.29", desc: "Other hypochondriacal disorders" },
  {
    code: "F45.41",
    desc: "Pain disorder exclusively related to psychological factors",
  },
  { code: "F45.42", desc: "Pain disorder with related psychological factors" },
  { code: "F48.1", desc: "Depersonalization-derealization syndrome" },
  { code: "F48.2", desc: "Pseudobulbar affect" },
  { code: "F48.8", desc: "Other specified nonpsychotic mental disorders" },
  { code: "F48.9", desc: "Nonpsychotic mental disorder, unspecified" },
  { code: "F50", desc: "Eating disorders" },
  {
    code: "F51",
    desc: "Sleep disorders not due to a substance or known physiological condition",
  },
  {
    code: "F52",
    desc: "Sexual dysfunction not due to a substance or known physiological condition",
  },
  {
    code: "F53",
    desc: "Mental and behavioral disorders associated with the puerperium, not elsewhere classified",
  },
  {
    code: "F54",
    desc: "Psychological and behavioral factors associated with disorders or diseases classified elsewhere",
  },
  { code: "F55", desc: "Abuse of non-psychoactive substances" },
  {
    code: "F59",
    desc: "Unspecified behavioral syndromes associated with physiological disturbances and physical factors",
  },
  { code: "F50.0", desc: "Anorexia nervosa" },
  { code: "F50.2", desc: "Bulimia nervosa" },
  { code: "F50.8", desc: "Other eating disorders" },
  { code: "F50.9", desc: "Eating disorder, unspecified" },
  { code: "F50.00", desc: "Anorexia nervosa, unspecified" },
  { code: "F50.01", desc: "Anorexia nervosa, restricting type" },
  { code: "F50.02", desc: "Anorexia nervosa, binge eating/purging type" },
  { code: "F50.81", desc: "Binge eating disorder" },
  { code: "F50.82", desc: "Avoidant/restrictive food intake disorder" },
  { code: "F50.89", desc: "Other specified eating disorder" },
  {
    code: "F51.0",
    desc: "Insomnia not due to a substance or known physiological condition",
  },
  {
    code: "F51.1",
    desc: "Hypersomnia not due to a substance or known physiological condition",
  },
  { code: "F51.3", desc: "Sleepwalking [somnambulism]" },
  { code: "F51.4", desc: "Sleep terrors [night terrors]" },
  { code: "F51.5", desc: "Nightmare disorder" },
  {
    code: "F51.8",
    desc: "Other sleep disorders not due to a substance or known physiological condition",
  },
  {
    code: "F51.9",
    desc: "Sleep disorder not due to a substance or known physiological condition, unspecified",
  },
  { code: "F51.01", desc: "Primary insomnia" },
  { code: "F51.02", desc: "Adjustment insomnia" },
  { code: "F51.03", desc: "Paradoxical insomnia" },
  { code: "F51.04", desc: "Psychophysiologic insomnia" },
  { code: "F51.05", desc: "Insomnia due to other mental disorder" },
  {
    code: "F51.09",
    desc: "Other insomnia not due to a substance or known physiological condition",
  },
  { code: "F51.11", desc: "Primary hypersomnia" },
  { code: "F51.12", desc: "Insufficient sleep syndrome" },
  { code: "F51.13", desc: "Hypersomnia due to other mental disorder" },
  {
    code: "F51.19",
    desc: "Other hypersomnia not due to a substance or known physiological condition",
  },
  { code: "F52.0", desc: "Hypoactive sexual desire disorder" },
  { code: "F52.1", desc: "Sexual aversion disorder" },
  { code: "F52.2", desc: "Sexual arousal disorders" },
  { code: "F52.3", desc: "Orgasmic disorder" },
  { code: "F52.4", desc: "Premature ejaculation" },
  {
    code: "F52.5",
    desc: "Vaginismus not due to a substance or known physiological condition",
  },
  {
    code: "F52.6",
    desc: "Dyspareunia not due to a substance or known physiological condition",
  },
  {
    code: "F52.8",
    desc: "Other sexual dysfunction not due to a substance or known physiological condition",
  },
  {
    code: "F52.9",
    desc: "Unspecified sexual dysfunction not due to a substance or known physiological condition",
  },
  { code: "F52.21", desc: "Male erectile disorder" },
  { code: "F52.22", desc: "Female sexual arousal disorder" },
  { code: "F52.31", desc: "Female orgasmic disorder" },
  { code: "F52.32", desc: "Male orgasmic disorder" },
  { code: "F53.0", desc: "Postpartum depression" },
  { code: "F53.1", desc: "Puerperal psychosis" },
  { code: "F55.0", desc: "Abuse of antacids" },
  { code: "F55.1", desc: "Abuse of herbal or folk remedies" },
  { code: "F55.2", desc: "Abuse of laxatives" },
  { code: "F55.3", desc: "Abuse of steroids or hormones" },
  { code: "F55.4", desc: "Abuse of vitamins" },
  { code: "F55.8", desc: "Abuse of other non-psychoactive substances" },
  { code: "F60", desc: "Specific personality disorders" },
  { code: "F63", desc: "Impulse disorders" },
  { code: "F64", desc: "Gender identity disorders" },
  { code: "F65", desc: "Paraphilias" },
  { code: "F66", desc: "Other sexual disorders" },
  { code: "F68", desc: "Other disorders of adult personality and behavior" },
  {
    code: "F69",
    desc: "Unspecified disorder of adult personality and behavior",
  },
  { code: "F60.0", desc: "Paranoid personality disorder" },
  { code: "F60.1", desc: "Schizoid personality disorder" },
  { code: "F60.2", desc: "Antisocial personality disorder" },
  { code: "F60.3", desc: "Borderline personality disorder" },
  { code: "F60.4", desc: "Histrionic personality disorder" },
  { code: "F60.5", desc: "Obsessive-compulsive personality disorder" },
  { code: "F60.6", desc: "Avoidant personality disorder" },
  { code: "F60.7", desc: "Dependent personality disorder" },
  { code: "F60.8", desc: "Other specific personality disorders" },
  { code: "F60.9", desc: "Personality disorder, unspecified" },
  { code: "F60.81", desc: "Narcissistic personality disorder" },
  { code: "F60.89", desc: "Other specific personality disorders" },
  { code: "F63.0", desc: "Pathological gambling" },
  { code: "F63.1", desc: "Pyromania" },
  { code: "F63.2", desc: "Kleptomania" },
  { code: "F63.3", desc: "Trichotillomania" },
  { code: "F63.8", desc: "Other impulse disorders" },
  { code: "F63.9", desc: "Impulse disorder, unspecified" },
  { code: "F63.81", desc: "Intermittent explosive disorder" },
  { code: "F63.89", desc: "Other impulse disorders" },
  { code: "F64.0", desc: "Transsexualism" },
  { code: "F64.1", desc: "Dual role transvestism" },
  { code: "F64.2", desc: "Gender identity disorder of childhood" },
  { code: "F64.8", desc: "Other gender identity disorders" },
  { code: "F64.9", desc: "Gender identity disorder, unspecified" },
  { code: "F65.0", desc: "Fetishism" },
  { code: "F65.1", desc: "Transvestic fetishism" },
  { code: "F65.2", desc: "Exhibitionism" },
  { code: "F65.3", desc: "Voyeurism" },
  { code: "F65.4", desc: "Pedophilia" },
  { code: "F65.5", desc: "Sadomasochism" },
  { code: "F65.8", desc: "Other paraphilias" },
  { code: "F65.9", desc: "Paraphilia, unspecified" },
  { code: "F65.50", desc: "Sadomasochism, unspecified" },
  { code: "F65.51", desc: "Sexual masochism" },
  { code: "F65.52", desc: "Sexual sadism" },
  { code: "F65.81", desc: "Frotteurism" },
  { code: "F65.89", desc: "Other paraphilias" },
  { code: "F68.1", desc: "Factitious disorder imposed on self" },
  { code: "F68.A", desc: "Factitious disorder imposed on another" },
  {
    code: "F68.8",
    desc: "Other specified disorders of adult personality and behavior",
  },
  { code: "F68.10", desc: "Factitious disorder imposed on self, unspecified" },
  {
    code: "F68.11",
    desc: "Factitious disorder imposed on self, with predominantly psychological signs and symptoms",
  },
  {
    code: "F68.12",
    desc: "Factitious disorder imposed on self, with predominantly physical signs and symptoms",
  },
  {
    code: "F68.13",
    desc: "Factitious disorder imposed on self, with combined psychological and physical signs and symptoms",
  },
  { code: "F70", desc: "Mild intellectual disabilities" },
  { code: "F71", desc: "Moderate intellectual disabilities" },
  { code: "F72", desc: "Severe intellectual disabilities" },
  { code: "F73", desc: "Profound intellectual disabilities" },
  { code: "F78", desc: "Other intellectual disabilities" },
  { code: "F79", desc: "Unspecified intellectual disabilities" },
  {
    code: "F80",
    desc: "Specific developmental disorders of speech and language",
  },
  {
    code: "F81",
    desc: "Specific developmental disorders of scholastic skills",
  },
  { code: "F82", desc: "Specific developmental disorder of motor function" },
  { code: "F84", desc: "Pervasive developmental disorders" },
  { code: "F88", desc: "Other disorders of psychological development" },
  { code: "F89", desc: "Unspecified disorder of psychological development" },
  { code: "F80.0", desc: "Phonological disorder" },
  { code: "F80.1", desc: "Expressive language disorder" },
  { code: "F80.2", desc: "Mixed receptive-expressive language disorder" },
  {
    code: "F80.4",
    desc: "Speech and language development delay due to hearing loss",
  },
  {
    code: "F80.8",
    desc: "Other developmental disorders of speech and language",
  },
  {
    code: "F80.9",
    desc: "Developmental disorder of speech and language, unspecified",
  },
  { code: "F80.81", desc: "Childhood onset fluency disorder" },
  { code: "F80.82", desc: "Social pragmatic communication disorder" },
  {
    code: "F80.89",
    desc: "Other developmental disorders of speech and language",
  },
  { code: "F81.0", desc: "Specific reading disorder" },
  { code: "F81.2", desc: "Mathematics disorder" },
  { code: "F81.8", desc: "Other developmental disorders of scholastic skills" },
  {
    code: "F81.9",
    desc: "Developmental disorder of scholastic skills, unspecified",
  },
  { code: "F81.81", desc: "Disorder of written expression" },
  {
    code: "F81.89",
    desc: "Other developmental disorders of scholastic skills",
  },
  { code: "F84.0", desc: "Autistic disorder" },
  { code: "F84.2", desc: "Rett's syndrome" },
  { code: "F84.3", desc: "Other childhood disintegrative disorder" },
  { code: "F84.5", desc: "Asperger's syndrome" },
  { code: "F84.8", desc: "Other pervasive developmental disorders" },
  { code: "F84.9", desc: "Pervasive developmental disorder, unspecified" },
  { code: "F90", desc: "Attention-deficit hyperactivity disorders" },
  { code: "F91", desc: "Conduct disorders" },
  { code: "F93", desc: "Emotional disorders with onset specific to childhood" },
  {
    code: "F94",
    desc: "Disorders of social functioning with onset specific to childhood and adolescence",
  },
  { code: "F95", desc: "Tic disorder" },
  {
    code: "F98",
    desc: "Other behavioral and emotional disorders with onset usually occurring in childhood and adolescence",
  },
  {
    code: "F90.0",
    desc: "Attention-deficit hyperactivity disorder, predominantly inattentive type",
  },
  {
    code: "F90.1",
    desc: "Attention-deficit hyperactivity disorder, predominantly hyperactive type",
  },
  {
    code: "F90.2",
    desc: "Attention-deficit hyperactivity disorder, combined type",
  },
  {
    code: "F90.8",
    desc: "Attention-deficit hyperactivity disorder, other type",
  },
  {
    code: "F90.9",
    desc: "Attention-deficit hyperactivity disorder, unspecified type",
  },
  { code: "F91.0", desc: "Conduct disorder confined to family context" },
  { code: "F91.1", desc: "Conduct disorder, childhood-onset type" },
  { code: "F91.2", desc: "Conduct disorder, adolescent-onset type" },
  { code: "F91.3", desc: "Oppositional defiant disorder" },
  { code: "F91.8", desc: "Other conduct disorders" },
  { code: "F91.9", desc: "Conduct disorder, unspecified" },
  { code: "F93.0", desc: "Separation anxiety disorder of childhood" },
  { code: "F93.8", desc: "Other childhood emotional disorders" },
  { code: "F93.9", desc: "Childhood emotional disorder, unspecified" },
  { code: "F94.0", desc: "Selective mutism" },
  { code: "F94.1", desc: "Reactive attachment disorder of childhood" },
  { code: "F94.2", desc: "Disinhibited attachment disorder of childhood" },
  { code: "F94.8", desc: "Other childhood disorders of social functioning" },
  {
    code: "F94.9",
    desc: "Childhood disorder of social functioning, unspecified",
  },
  { code: "F95.0", desc: "Transient tic disorder" },
  { code: "F95.1", desc: "Chronic motor or vocal tic disorder" },
  { code: "F95.2", desc: "Tourette's disorder" },
  { code: "F95.8", desc: "Other tic disorders" },
  { code: "F95.9", desc: "Tic disorder, unspecified" },
  {
    code: "F98.0",
    desc: "Enuresis not due to a substance or known physiological condition",
  },
  {
    code: "F98.1",
    desc: "Encopresis not due to a substance or known physiological condition",
  },
  { code: "F98.2", desc: "Other feeding disorders of infancy and childhood" },
  { code: "F98.3", desc: "Pica of infancy and childhood" },
  { code: "F98.4", desc: "Stereotyped movement disorders" },
  { code: "F98.5", desc: "Adult onset fluency disorder" },
  {
    code: "F98.8",
    desc: "Other specified behavioral and emotional disorders with onset usually occurring in childhood and adolescence",
  },
  {
    code: "F98.9",
    desc: "Unspecified behavioral and emotional disorders with onset usually occurring in childhood and adolescence",
  },
  { code: "F98.21", desc: "Rumination disorder of infancy" },
  {
    code: "F98.29",
    desc: "Other feeding disorders of infancy and early childhood",
  },
  { code: "F99", desc: "Mental disorder, not otherwise specified" },
];

export const getICDCodes = (): Array<ICDCode> => {
  return icdCodes;
};
