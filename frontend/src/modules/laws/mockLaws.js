/**
 * Mock law data for frontend (Saudi Arabia & India).
 * Replace with law-service API when backend is connected.
 */

export const JURISDICTIONS = { SAUDI: 'SA', INDIA: 'IN' };

export const MOCK_LAWS = [
  {
    id: 'sa-rd-1',
    jurisdiction: 'SA',
    titleAr: 'نظام الشركات',
    titleEn: 'Companies Law (reference only)',
    year: 2022,
    category: 'Commercial',
    ministry: 'Ministry of Commerce',
    type: 'Royal Decree',
    articleCount: 220,
  },
  {
    id: 'sa-rd-labour',
    jurisdiction: 'SA',
    titleAr: 'نظام العمل',
    titleEn: 'Labour Law (reference only)',
    year: 2005,
    category: 'Labour',
    ministry: 'Ministry of Human Resources and Social Development',
    type: 'Royal Decree',
    articleCount: 245,
  },
  {
    id: 'sa-reg-1',
    jurisdiction: 'SA',
    titleAr: 'اللائحة التنفيذية لنظام العمل',
    titleEn: 'Labour Law Executive Regulation (reference only)',
    year: 2021,
    category: 'Labour',
    ministry: 'Ministry of Human Resources and Social Development',
    type: 'Regulation',
    articleCount: 180,
  },
  {
    id: 'in-act-1',
    jurisdiction: 'IN',
    titleEn: 'Indian Contract Act, 1872',
    year: 1872,
    category: 'Commercial',
    ministry: 'Ministry of Law',
    type: 'Act',
    articleCount: 238,
  },
  {
    id: 'in-act-2',
    jurisdiction: 'IN',
    titleEn: 'Code of Civil Procedure, 1908',
    year: 1908,
    category: 'Procedure',
    ministry: 'Ministry of Law',
    type: 'Act',
    articleCount: 158,
  },
];

export const MOCK_ARTICLES = {
  'sa-rd-1': [
    { number: 1, textAr: 'تؤسس الشركات المنظمة بهذا النظام في أحد الأشكال المنصوص عليها في المادة الثانية.', obligation: 'Companies under this Law shall be established in one of the forms prescribed in Article 2.', exception: null, penalty: null, authority: 'Competent Authority' },
    { number: 2, textAr: 'يجوز أن تكون الشركة في شكل شركة مساهمة، أو شركة ذات مسؤولية محدودة، أو غير ذلك من الأشكال التي تحددها اللائحة التنفيذية. ما لم ينص نظام خاص على خلاف ذلك.', obligation: 'A company may take the form of a joint stock company, limited liability company, or other forms specified by the Executive Regulation.', exception: 'Unless otherwise provided by a special regulation.', penalty: null, authority: 'Ministry of Commerce' },
    { number: 3, textAr: 'يكون للشركة مكتب مسجل في المملكة. وتُغرّم الشركة غرامة إدارية وفقاً للائحة التنفيذية في حال المخالفة.', obligation: 'The company must have a registered office in the Kingdom.', exception: null, penalty: 'Administrative fine as per the Executive Regulation.', authority: 'Ministry of Commerce' },
  ],
  'sa-rd-labour': [
    { number: 1, textAr: 'يهدف النظام إلى تحقيق الأهداف التالية: تنظيم علاقات العمل، وحماية حقوق أطراف العلاقة التعاقدية، وتشجيع الاستقرار في علاقات العمل.', obligation: 'The Law aims to achieve the following: regulate employment relations, protect the rights of the parties to the employment contract, and promote stability in employment relations.', exception: null, penalty: null, authority: 'Ministry of Human Resources and Social Development' },
    { number: 2, textAr: 'يعمل بأحكام هذا النظام على جميع علاقات العمل التي تنشأ بين أصحاب العمل والعمال في المملكة، عدا من استثنى النظام.', obligation: 'The provisions of this Law apply to all employment relations between employers and workers in the Kingdom, except those excluded by the Law.', exception: 'As excluded by the Law.', penalty: null, authority: 'Ministry of Human Resources and Social Development' },
  ],
  'sa-reg-1': [
    { number: 1, textAr: 'تطبق هذه اللائحة على جميع المنشآت والعمال الخاضعين لنظام العمل، في حدود ما لا يتعارض مع النظام.', obligation: 'This Regulation applies to all establishments and workers subject to the Labour Law, to the extent that it does not conflict with the Law.', exception: null, penalty: null, authority: 'Ministry of Human Resources and Social Development' },
  ],
  'in-act-1': [
    { number: 10, obligation: 'All agreements are contracts if they are made by the free consent of parties competent to contract.', exception: 'Minors, persons of unsound mind, and those disqualified by law are not competent.', penalty: null, authority: 'Courts' },
    { number: 23, obligation: 'The consideration or object of an agreement is lawful unless it is forbidden by law or is of such a nature that, if permitted, would defeat the provisions of any law.', exception: null, penalty: 'Agreement is void.', authority: 'Courts' },
  ],
};

export const MOCK_AMENDMENTS = [
  { id: 'am1', lawId: 'sa-rd-1', date: '2023-06-01', descriptionAr: 'تعديل المادة 2', descriptionEn: 'Amendment to Article 2', articleNumbers: [2] },
  { id: 'am2', lawId: 'in-act-1', date: '2018-09-12', descriptionEn: 'Amendment to Section 10 (clarification)', articleNumbers: [10] },
];

export const MOCK_VERSIONS = {
  'sa-rd-1': [
    { version_id: 'v1', effective_date: '2022-06-01', label: 'Initial' },
    { version_id: 'v2', effective_date: '2023-06-01', label: 'After Amendment 2023' },
  ],
  'in-act-1': [{ version_id: 'v1', effective_date: '1872-09-25', label: 'As amended' }],
};

/** Mock diff (added / removed / modified). Matches law-service /laws/{id}/diff/{versionA}/{versionB}. */
export const MOCK_DIFF = {
  'sa-rd-1': {
    'v1_v2': {
      added_clauses: [2],
      removed_clauses: [],
      modified_obligations: [
        {
          change_type: 'modified',
          article_number: 2,
          old_obligation: 'A company may take the form prescribed by the Executive Regulation.',
          new_obligation: 'A company may take the form of a joint stock company, limited liability company, or other forms specified by the Executive Regulation.',
          old_exception: null,
          new_exception: 'Unless otherwise provided by a special regulation.',
        },
      ],
    },
  },
};
