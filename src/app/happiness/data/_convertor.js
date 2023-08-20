const fs = require("fs");

const info = `The Happiness Score Questionnaire, a 50-question tool, quantifies happiness and well-being in areas like personal satisfaction, health, work satisfaction, and spirituality. The happiness score is an average of all responses, with higher scores indicating greater happiness. A demographic section provides context for deeper data analysis but doesn't influence the score. This questionnaire aims to guide AI chatbot development, helping users boost their scores and achieve greater happiness. It also lays groundwork for Artificial General Intelligence (AGI) or Superintelligent AI (SGI) to offer personalized solutions, with the ultimate goal of improving individuals' happiness using AI.`;
const instructions = `Instructions: Please answer the following questions on a scale from 0 to 10, where 0 means "Not at all" and 10 means "Completely". Your answers will be used to calculate a Happiness score, which will be a number with two digits after the comma.`;

const textQuestions = `Cantril Ladder:!
1. On a scale of 0 to 10, how would you rate your overall satisfaction with life?
Satisfaction With Life:!
2. To what extent do you feel the things you do in your life are worthwhile?
3. How happy did you feel last week?
4. How anxious did you feel last week?
Psychological Well-Being:!
5. How much do you agree with the statement: "I lead a purposeful and meaningful life"?
6. How engaged and interested are you in your daily activities?
7. How optimistic are you about your future?
8. How often do you feel a sense of accomplishment from what you do?
9. How positive do you feel about yourself?
Spiritual Well-Being:!
10. How often do you feel a sense of peace and tranquility in your life?
11. How often do you take time for self-reflection or meditation?
12. How connected do you feel to the world around you?
13. How often do you feel a sense of awe or wonder about the universe?
14. How much do you feel that you are living in alignment with your true self?
15. How often do you feel a sense of gratitude in your life?
16. How much do you feel that your life is filled with purpose and meaning?
17. How often do you engage in activities that you are passionate about?
18. How much do you feel that you are growing as a person?
19. How often do you feel a sense of joy in your life?
20. How much do you feel that you are contributing positively to the lives of others?
Health:!
21. How would you rate your overall health?
22. How much energy did you have in the past week?
23. How satisfied were you with your ability to perform your daily living activities?
24. How satisfied were you with the quality of your exercise?
Time Balance:!
25. How much of your time are you able to spend doing the things that you enjoy?
26. How rushed has your life been in the past week?
27. How much spare time did you have in the past week?
Lifelong Learning, Arts & Culture:!
28. How satisfied are you with your access to sports and recreational activities?
29. How satisfied are you with your access to artistic and cultural activities?
30. How satisfied are you with your access to activities to develop skills through informal education?
Community:!
31. How often do you feel uncomfortable or out of place in your neighborhood because of your ethnicity, culture, race, skin color, language, accent, gender, sexual orientation, or religion?
32. How strong is your feeling of belonging to your local community?
33. How much do you trust your neighbors?
34. How much do you trust businesses in your community?
Social support:!
35. How satisfied are you with your personal relationships?
36. To what extent do you agree with the statement: "People in my life care about me"?
37. How often did you feel loved in the past week?
38. How often did you feel lonely in the past week?
Environment:!
39. How healthy is your physical environment?
40. How satisfied are you with the efforts being made to preserve the natural environment in your neighborhood?
41. How satisfied are you with the opportunities that you have to enjoy nature?
Government:!
42. How much do you agree with the statement: "Corruption is widespread throughout the government in my city or town"?
43. How much do you agree with the statement: "The public officials in my city or town pay attention to what people think"?
44. How much confidence do you have in the national government?
Standard of Living - Economy:!
45. How satisfied are you with your freedom to choose what you do with your life?
46. How much stress do you feel about your personal finances?
47. How frequently do you find yourself just getting by financially and living paycheck to paycheck?
Work:!
48. How satisfied are you with your current work life?
49. How satisfied are you with the balance between the time you spend on your job and the time you spend on other aspects of your life?
50. How interesting do you find your current work life?
`;

const textDemographic = `
1. What is your current age?
* Under 12 years old
* 12-17
* 18-24
* 25-29
* 30-34
* 35-39
* 40-44
* 45-49
* 50-54
* 55-59
* 60-64
* 65-69
* 70-74
* 75-79
* 80-84
* 85-89
* 90+


2. Which gender do you identify as?
* Male
* Female
* Other


3. What ethnicity do you identify as?
* Black/African
* East Asian
* Hispanic
* Middle Eastern
* South Asian
* White/European/Caucasian
* Two or more
* Other
* Prefer not to say


4. What is your current marital status?
* Single, never married
* Married or domestic partnership
* Widowed
* Divorced
* Separated
* Other


5. Do you have any children under 18?
* Yes
* No


6. How many people currently reside in your household, including you?
* 1
* 2
* 3
* 4
* 5
* 6
* 7
* 8
* 9 or more


7. In which country do you live?
Afghanistan
Albania
Algeria
American Samoa
Andorra
Angola
Anguilla
Antarctica
Antigua and Barbuda
Argentina
Armenia
Aruba
Australia
Austria
Azerbaijan
Bahamas (the)
Bahrain
Bangladesh
Barbados
Belarus
Belgium
Belize
Benin
Bermuda
Bhutan
Bolivia (Plurinational State of)
Bonaire, Sint Eustatius and Saba
Bosnia and Herzegovina
Botswana
Bouvet Island
Brazil
British Indian Ocean Territory (the)
Brunei Darussalam
Bulgaria
Burkina Faso
Burundi
Cabo Verde
Cambodia
Cameroon
Canada
Cayman Islands (the)
Central African Republic (the)
Chad
Chile
China
Christmas Island
Cocos (Keeling) Islands (the)
Colombia
Comoros (the)
Congo (the Democratic Republic of the)
Congo (the)
Cook Islands (the)
Costa Rica
Croatia
Cuba
Curaçao
Cyprus
Czechia
Côte d'Ivoire
Denmark
Djibouti
Dominica
Dominican Republic (the)
Ecuador
Egypt
El Salvador
Equatorial Guinea
Eritrea
Estonia
Eswatini
Ethiopia
Falkland Islands (the) [Malvinas]
Faroe Islands (the)
Fiji
Finland
France
French Guiana
French Polynesia
French Southern Territories (the)
Gabon
Gambia (the)
Georgia
Germany
Ghana
Gibraltar
Greece
Greenland
Grenada
Guadeloupe
Guam
Guatemala
Guernsey
Guinea
Guinea-Bissau
Guyana
Haiti
Heard Island and McDonald Islands
Holy See (the)
Honduras
Hong Kong
Hungary
Iceland
India
Indonesia
Iran (Islamic Republic of)
Iraq
Ireland
Isle of Man
Israel
Italy
Jamaica
Japan
Jersey
Jordan
Kazakhstan
Kenya
Kiribati
Korea (the Democratic People's Republic of)
Korea (the Republic of)
Kuwait
Kyrgyzstan
Lao People's Democratic Republic (the)
Latvia
Lebanon
Lesotho
Liberia
Libya
Liechtenstein
Lithuania
Luxembourg
Macao
Madagascar
Malawi
Malaysia
Maldives
Mali
Malta
Marshall Islands (the)
Martinique
Mauritania
Mauritius
Mayotte
Mexico
Micronesia (Federated States of)
Moldova (the Republic of)
Monaco
Mongolia
Montenegro
Montserrat
Morocco
Mozambique
Myanmar
Namibia
Nauru
Nepal
Netherlands (the)
New Caledonia
New Zealand
Nicaragua
Niger (the)
Nigeria
Niue
Norfolk Island
Northern Mariana Islands (the)
Norway
Oman
Pakistan
Palau
Palestine, State of
Panama
Papua New Guinea
Paraguay
Peru
Philippines (the)
Pitcairn
Poland
Portugal
Puerto Rico
Qatar
Republic of North Macedonia
Romania
Russian Federation (the)
Rwanda
Réunion
Saint Barthélemy
Saint Helena, Ascension and Tristan da Cunha
Saint Kitts and Nevis
Saint Lucia
Saint Martin (French part)
Saint Pierre and Miquelon
Saint Vincent and the Grenadines
Samoa
San Marino
Sao Tome and Principe
Saudi Arabia
Senegal
Serbia
Seychelles
Sierra Leone
Singapore
Sint Maarten (Dutch part)
Slovakia
Slovenia
Solomon Islands
Somalia
South Africa
South Georgia and the South Sandwich Islands
South Sudan
Spain
Sri Lanka
Sudan (the)
Suriname
Svalbard and Jan Mayen
Sweden
Switzerland
Syrian Arab Republic
Taiwan
Tajikistan
Tanzania, United Republic of
Thailand
Timor-Leste
Togo
Tokelau
Tonga
Trinidad and Tobago
Tunisia
Turkey
Turkmenistan
Turks and Caicos Islands (the)
Tuvalu
Uganda
Ukraine
United Arab Emirates (the)
United Kingdom of Great Britain and Northern Ireland (the)
United States Minor Outlying Islands (the)
United States of America (the)
Uruguay
Uzbekistan
Vanuatu
Venezuela (Bolivarian Republic of)
Viet Nam
Virgin Islands (British)
Virgin Islands (U.S.)
Wallis and Futuna
Western Sahara
Yemen
Zambia
Zimbabwe
Åland Islands

8. How spiritual do you consider yourself to be?
* Not at all
* Nor very
* Somewhat
* Moderately
* Very


9. Please rate your satisfaction with the beauty of the area where you live:
* 0
* 1
* 2
* 3
* 4
* 5
* 6
* 7
* 8
* 9
* 10


10. What is the highest level of education that you have completed?
* Less then grade 9 - no highschool
* Higher then grade 9 but less then grade 12 - started highschool but did not graduate
* High school graduate or equivalent
* Trade - Technical or Vocational training
* Associate Degree - AA/AS/etc
* Bachelor Degree - BA/BS/AB
* Graduate University Degree - MA/MS/MBA/etc
* Professional Degree - MD/DDS/DVM/LLB/JD/etc
* Doctoral Degree - PhD/EdD/etc
* Other


11. Regarding employment, which of the following options best describe your current work life?
* Full time Employee
* Part-time Employee
* Self-Employed
* Military
* Volunteer
* Homemaker
* Unemployed looking for work
* Unemployed not looking for work
* Retired
* Student or training
* Unable to work
* Other


12. What was your total household income from all sources last year (including wages, winnings, awards, profits, investments, etc)?
* Less then 10.000 USD
* This goes every 10.000 USD up to 250.000 USD
* 250.000 USD and over`;

const numberAtStart = /\d*\. /gm;

const qLines = textQuestions.split("\n");

const questions = [];

for (const line of qLines) {
    if (line.includes(":!")) {
        questions.push({ name: line.replace(":!", ""), question: [] });
    } else if (line)
        questions[questions.length - 1].question.push({
            value: line.replace(numberAtStart, ""),
            variants: Array.from(new Array(11)).map((_, i) => i),
        });
}

const dLines = textDemographic.split("\n");
const demographic = [];
for (const line of dLines) {
    if (numberAtStart.test(line)) {
        demographic.push({
            value: line.replace(numberAtStart, ""),
            variants: [],
        });
    } else if (line) {
        demographic[demographic.length - 1].variants.push(
            line.replace("* ", ""),
        );
    }
}

fs.writeFileSync(
    "./survey.json",
    JSON.stringify({ info, instructions, questions, demographic }, null, 2),
);
