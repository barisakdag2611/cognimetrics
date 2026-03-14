// ============================================================
// TURKISH ITEM BANK — Language-dependent subtests only
// PM, MS, QR, SM are language-independent — no TR version needed.
// RR premises need translation.
// CL and WD need CULTURALLY NATIVE items — not translations.
// ============================================================

import { decomposeItem } from './cognitiveDecomposition';

function item(content, decomp) {
  const derived = decomposeItem(decomp);
  return { ...content, ...derived };
}

// ========================================
// CONCEPTUAL LINKS — TURKISH (Gc)
// ========================================
// Türkçe'ye özgü analojiler. Çeviri değil, yapısal eşdeğer.
// Aynı R, T, B, N, D profili — farklı kültürel yüzey.

export const conceptualLinksTR = [
  // CL1-TR: Somut karşıtlık
  item({
    id: "cl1_tr",
    analogy: "Sıcak, Soğuk'un karşıtıysa; Gündüz, ___'ın karşıtıdır",
    options: ["Gece", "Güneş", "Aydınlık", "Sabah"],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 1, B: 2, N: 1, D: 1, factor: "Gc" }),

  // CL2-TR: İşlevsel ilişki — alet-kullanıcı
  item({
    id: "cl2_tr",
    analogy: "Kalem, Yazar'ın aracıysa; Tezgâh, ___'ın aracıdır",
    options: ["Kasap", "Et", "Bıçak", "Dükkan"],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 1, B: 3, N: 1, D: 2, factor: "Gc" }),

  // CL3-TR: Gelişimsel — öncül→sonuç
  item({
    id: "cl3_tr",
    analogy: "Tohum, Ağaç'ın başlangıcıysa; Hamur, ___'ın başlangıcıdır",
    options: ["Ekmek", "Un", "Fırın", "Maya"],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 2, B: 3, N: 1, D: 2, factor: "Gc" }),

  // CL4-TR: Araç→alan
  item({
    id: "cl4_tr",
    analogy: "Stetoskop, Kalp'i dinlerse; Sismograf, ___'ı dinler",
    options: ["Deprem", "Toprak", "Dağ", "Volkan"],
    correct: 0,
    timeLimit: 45,
  }, { R: 1, T: 1, B: 3, N: 2, D: 2, factor: "Gc" }),

  // CL5-TR: Dönüşüm — aynı öz, farklı form
  item({
    id: "cl5_tr",
    analogy: "Buz, Su'yun katı haliyse; Buhar, Su'yun ___ halidir",
    options: ["Gaz", "Sıvı", "Sıcak", "Hafif"],
    correct: 0,
    timeLimit: 45,
  }, { R: 2, T: 2, B: 3, N: 2, D: 2, factor: "Gc" }),

  // CL6-TR: Yaratıcı→eser (soyut plan → somut)
  item({
    id: "cl6_tr",
    analogy: "Beste, Bestecinin eseriyse; Kanun, ___'ın eseridir",
    options: ["Meclis", "Hâkim", "Devlet", "Hukuk"],
    correct: 0,
    timeLimit: 45,
  }, { R: 2, T: 2, B: 4, N: 2, D: 3, factor: "Gc" }),

  // CL7-TR: Süreç→yapı — bozucu süreç
  item({
    id: "cl7_tr",
    analogy: "Pas, Demir'i çürütürse; Dedikodu, ___'ı çürütür",
    options: ["Güven", "İnsan", "Toplum", "Söz"],
    correct: 0,
    timeLimit: 60,
  }, { R: 2, T: 2, B: 4, N: 3, D: 3, factor: "Gc" }),

  // CL8-TR: Temel→türev
  item({
    id: "cl8_tr",
    analogy: "Alfabe, Dilin temelidiyse; Anayasa, ___'ın temelidir",
    options: ["Hukuk", "Devlet", "Özgürlük", "Demokrasi"],
    correct: 0,
    timeLimit: 60,
  }, { R: 2, T: 3, B: 4, N: 3, D: 3, factor: "Gc" }),

  // CL9-TR: Biçimsel yapı→somutlaşma
  item({
    id: "cl9_tr",
    analogy: "Gramer, Dil'in kuralıysa; Ahlak, ___'ın kuralıdır",
    options: ["Davranış", "Toplum", "Din", "Vicdan"],
    correct: 0,
    timeLimit: 60,
  }, { R: 3, T: 3, B: 4, N: 3, D: 4, factor: "Gc" }),

  // CL10-TR: Meta-yapısal
  item({
    id: "cl10_tr",
    analogy: "İzomorfizm, Yapı'yı korursa; Tercüme, ___'yı korur",
    options: ["Anlam", "Dil", "Kelime", "Kültür"],
    correct: 0,
    timeLimit: 60,
  }, { R: 3, T: 3, B: 5, N: 4, D: 4, factor: "Gc" }),

  // CL10b-TR: Meta-yapısal ilişki — gözlemci gözleneni etkiler
  // R=4, T=3, B=5, N=4, D=5
  item({
    id: "cl10b_tr",
    analogy: "Gözlemci Etkisi, Kuantum Mekaniği için neyse; Refleksivite, ___ için odur",
    options: ["Sosyal Bilim", "Matematik", "Bilinç", "Epistemoloji"],
    correct: 0,
    timeLimit: 75,
  }, { R: 4, T: 3, B: 5, N: 4, D: 5, factor: "Gc" }),

  // CL11-TR: Çapraz-alan yapısal değişmez
  item({
    id: "cl11_tr",
    analogy: "Gödel'in Eksiklik Teoremi, Biçimsel Sistemler için neyse; Heisenberg'in Belirsizlik İlkesi, ___ için odur",
    options: ["Ölçüm Sistemleri", "Kuantum Mekaniği", "Fizik", "Olasılık"],
    correct: 0,
    timeLimit: 90,
  }, { R: 4, T: 4, B: 6, N: 5, D: 5, factor: "Gc" }),

  // CL12-TR: İkinci-derece ilişki
  item({
    id: "cl12_tr",
    analogy: "Özyineleme, Bilinç için neyse; Otokataliz, ___ için odur",
    options: ["Yaşam", "Kimya", "Metabolizma", "Üreme"],
    correct: 0,
    timeLimit: 90,
  }, { R: 5, T: 5, B: 7, N: 5, D: 5, factor: "Gc" }),
];

// ========================================
// WORD DEPTH — TURKISH (Gc)
// ========================================
// Türkçe sözcük derinliği. İngilizce'den bağımsız,
// Türkçe'nin kendi semantik derinlik katmanları.

export const wordDepthTR = [
  // WD1-TR: Yaygın, somut
  item({
    id: "wd1_tr",
    question: "Hangi sözcük 'bir şeyi daha iyi hale getirmek' anlamına gelir?",
    options: ["İyileştirmek", "Yıkmak", "Sürdürmek", "Gözlemlemek"],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 1, B: 2, N: 1, D: 1, factor: "Gc" }),

  // WD2-TR
  item({
    id: "wd2_tr",
    question: "Hangi sözcük 'aynı anda gerçekleşen' anlamına gelir?",
    options: ["Eş zamanlı", "Ardışık", "Sık sık", "Ara sıra"],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 1, B: 2, N: 1, D: 2, factor: "Gc" }),

  // WD3-TR: Spesifik anlam ayrımı
  item({
    id: "wd3_tr",
    question: "'Feragat etmek' en doğru olarak ne anlama gelir?",
    options: [
      "Bir haktan kendi isteğiyle vazgeçmek",
      "Bir görevi bırakmak",
      "Bir şeyi kaybetmek",
      "Bir şeyden kaçmak"
    ],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 1, B: 2, N: 2, D: 3, factor: "Gc" }),

  // WD4-TR: İnce ayrım
  item({
    id: "wd4_tr",
    question: "'İstihza' en doğru olarak ne anlama gelir?",
    options: [
      "İnce alayla küçümseme",
      "Şaka yapma",
      "Eleştirme",
      "Kızgınlık gösterme"
    ],
    correct: 0,
    timeLimit: 45,
  }, { R: 1, T: 1, B: 3, N: 2, D: 3, factor: "Gc" }),

  // WD5-TR: Soyut kavram
  item({
    id: "wd5_tr",
    question: "'Münzevi' en doğru olarak ne anlama gelir?",
    options: [
      "Toplumdan uzak, yalnız yaşayan",
      "Çok dindar olan",
      "Sessiz ve sakin",
      "Dünyadan habersiz"
    ],
    correct: 0,
    timeLimit: 45,
  }, { R: 1, T: 1, B: 3, N: 2, D: 4, factor: "Gc" }),

  // WD6-TR: Nadir, kesin anlamlı
  item({
    id: "wd6_tr",
    question: "'Müphem' en doğru olarak ne anlama gelir?",
    options: [
      "Belirsiz, birden fazla anlama gelebilen",
      "Tamamen yanlış olan",
      "Anlaşılması zor olan",
      "Karmaşık ve detaylı"
    ],
    correct: 0,
    timeLimit: 45,
  }, { R: 1, T: 1, B: 3, N: 2, D: 3, factor: "Gc" }),

  // WD7-TR: Nadir, bilişsel kavram — 4 ilişkili anlamı karşılaştırma gerektirir
  // R=2, T=2, B=3, N=3, D=3
  item({
    id: "wd7_tr",
    question: "'Müteyakkız' en doğru olarak ne anlama gelir?",
    options: [
      "Son derece uyanık ve dikkatli",
      "Şüpheci ve güvensiz",
      "Aşırı tedbirli",
      "Sürekli endişeli"
    ],
    correct: 0,
    timeLimit: 60,
  }, { R: 2, T: 2, B: 3, N: 3, D: 3, factor: "Gc" }),

  // WD8-TR: Çok nadir, felsefi — meta-kavram: aşkınlık
  // R=2, T=2, B=3, N=3, D=4
  item({
    id: "wd8_tr",
    question: "'Müteal' en doğru olarak ne anlama gelir?",
    options: [
      "Her şeyin üstünde, aşkın",
      "Çok yüce ve kutsal",
      "Erişilmesi imkânsız",
      "Son derece güçlü"
    ],
    correct: 0,
    timeLimit: 60,
  }, { R: 2, T: 2, B: 3, N: 3, D: 4, factor: "Gc" }),

  // WD9-TR: Meta-dilbilimsel — öz-gönderimsel
  // R=1, T=2, B=3, N=3, D=4
  item({
    id: "wd9_tr",
    question: "'Tağyir' en doğru olarak ne anlama gelir?",
    options: [
      "Bir şeyin özünü veya biçimini değiştirme",
      "Bir şeyi yok etme",
      "Bir şeyi gizleme",
      "Bir şeyi tamir etme"
    ],
    correct: 0,
    timeLimit: 60,
  }, { R: 1, T: 2, B: 3, N: 3, D: 4, factor: "Gc" }),

  // WD10-TR: Nadir bilişsel/algısal kavram — üstbilişsel önyargı
  // R=2, T=3, B=3, N=3, D=4
  item({
    id: "wd10_tr",
    question: "'Pareidolia' en doğru olarak ne anlama gelir?",
    options: [
      "Rastgele uyaranlarda anlamlı örüntüler görme eğilimi",
      "Aşırı düzen takıntısı",
      "Yüzleri tanıyamama durumu",
      "Görsel halüsinasyon türü"
    ],
    correct: 0,
    timeLimit: 60,
  }, { R: 2, T: 3, B: 3, N: 3, D: 4, factor: "Gc" }),

  // WD13-TR: Felsefi terim, yakın kavramlardan ayrıştırma
  // R=3, T=2, B=4, N=3, D=4
  item({
    id: "wd13_tr",
    question: "'Numen' en doğru olarak ne anlama gelir?",
    options: [
      "Bir varlığın veya yerin ilahi güç veya irade taşıdığı inanışı",
      "Sayılara atfedilen mistik güç",
      "Tanrısal düzenin evrendeki yansıması",
      "Ruhani bir uyanış deneyimi"
    ],
    correct: 0,
    timeLimit: 60,
  }, { R: 3, T: 2, B: 4, N: 3, D: 4, factor: "Gc" }),

  // WD14-TR: Nadir felsefi terim
  // R=3, T=2, B=4, N=4, D=4
  item({
    id: "wd14_tr",
    question: "'Apodiktik' en doğru olarak ne anlama gelir?",
    options: [
      "Zorunlu olarak ve tartışmasız biçimde doğru olan",
      "Deneysel kanıtlara dayanan",
      "Kanıta ihtiyaç duymadan apaçık olan",
      "Mantıksal olarak geçerli ama zorunlu olarak doğru olmayan"
    ],
    correct: 0,
    timeLimit: 60,
  }, { R: 3, T: 2, B: 4, N: 4, D: 4, factor: "Gc" }),

  // WD15-TR: Teknik terim, disiplinlerarası anlam
  // R=3, T=3, B=4, N=4, D=4
  item({
    id: "wd15_tr",
    question: "'Ergodiklik' kesin teknik anlamıyla ne demektir?",
    options: [
      "Bir sistemde zaman ortalamalarının topluluk ortalamalarına yakınsaması özelliği",
      "Tüm sistemlerin maksimum entropiye ulaşma eğilimi",
      "Termodinamik süreçlerin geri döndürülemezliği",
      "Ardışık gözlemlerin istatistiksel bağımsızlığı"
    ],
    correct: 0,
    timeLimit: 75,
  }, { R: 3, T: 3, B: 4, N: 4, D: 4, factor: "Gc" }),

  // WD16-TR: Felsefi terim, çok yakın çeldiriciler
  // R=3, T=3, B=5, N=4, D=5
  item({
    id: "wd16_tr",
    question: "'Hipostaz' felsefi kullanımda en doğru olarak ne anlama gelir?",
    options: [
      "Bir şeyin altında yatan gerçeklik veya töz, ya da soyut bir kavramın somutlaştırılması",
      "Bir teorinin üzerine kurulduğu temel varsayım",
      "Soyut düşüncelerin somut kurumlara dönüşme süreci",
      "İki karşıt güç arasında askıda kalma durumu"
    ],
    correct: 0,
    timeLimit: 75,
  }, { R: 3, T: 3, B: 5, N: 4, D: 5, factor: "Gc" }),

  // WD11-TR: Son derece nadir felsefi terim
  item({
    id: "wd11_tr",
    question: "'Apeiron' orijinal felsefi anlamıyla en doğru olarak ne anlama gelir?",
    options: [
      "Her şeyin kendisinden çıkıp geri döndüğü sınırsız, belirsiz kaynak",
      "Sonsuz matematiksel gerileme kavramı",
      "Yaratılıştan önceki kusursuz biçimsizlik hali",
      "Tüm fenomenlerin altında yatan bilinemez öz"
    ],
    correct: 0,
    timeLimit: 75,
  }, { R: 4, T: 4, B: 5, N: 4, D: 5, factor: "Gc" }),

  // WD12-TR: Nadir üstbilişsel terim
  item({
    id: "wd12_tr",
    question: "'Hiperpraksi' en doğru olarak ne anlama gelir?",
    options: [
      "İşlevsel gerekliğin ötesinde amaçlı etkinliğe aşırı veya zorlantılı katılım",
      "Birden fazla karmaşık eylemi eşzamanlı gerçekleştirme yetisi",
      "Bilinçli çabayı aşan yüksek pratik beceri durumu",
      "Hedefe yönelik hareketlerin patolojik tekrarı"
    ],
    correct: 0,
    timeLimit: 75,
  }, { R: 4, T: 5, B: 6, N: 4, D: 5, factor: "Gc" }),
];

// ========================================
// RELATIONAL REASONING — TURKISH TRANSLATIONS
// ========================================
// These are translations of the same structural items.
// R, T, B, N, D profiles are identical — only surface language changes.

export const relationalReasoningTR = [
  item({
    id: "rr1_tr",
    premise: "Tüm A'lar B'dir. Tüm B'ler C'dir.",
    question: "X bir A ise, X kesinlikle nedir?",
    options: ["C", "C değil", "Belki C", "Belirlenemez"],
    correct: 0,
    timeLimit: 45,
  }, { R: 1, T: 1, B: 3, N: 1, D: 2, factor: "Gf" }),

  item({
    id: "rr2_tr",
    premise: "Yağmur yağarsa, yer ıslanır. Yer ıslak.",
    question: "Yağmur yağdığı sonucuna varabilir miyiz?",
    options: [
      "Hayır — yer başka nedenlerle de ıslak olabilir",
      "Evet — yağmur ıslatır",
      "Sadece başka su kaynağı yoksa",
      "Evet — ifade bunu garanti eder"
    ],
    correct: 0,
    timeLimit: 45,
  }, { R: 1, T: 2, B: 3, N: 2, D: 3, factor: "Gf" }),

  item({
    id: "rr3_tr",
    premise: "P → Q. Q → R. ¬R.",
    question: "Ne sonucuna varabiliriz?",
    options: ["¬P", "P", "Q", "Belirlenemez"],
    correct: 0,
    timeLimit: 60,
  }, { R: 2, T: 2, B: 4, N: 2, D: 2, factor: "Gf" }),

  item({
    id: "rr4_tr",
    premise: "5 kişi arasında (A-E): A, B'den uzundur. C, D'den kısadır. B, C'den uzundur. E, A'dan kısa ama D'den uzundur.",
    question: "En kısa kim?",
    options: ["C", "B", "E", "D"],
    correct: 0,
    timeLimit: 75,
  }, { R: 2, T: 2, B: 5, N: 2, D: 3, factor: "Gf" }),

  item({
    id: "rr5_tr",
    premise: "6 koltukluk bir sırada: F, G'nin yanında oturur. H, I'nın yanında oturamaz. J bir uçta oturur. K, J'den tam 2 koltuk uzaktadır.",
    question: "G 3. koltukta oturuyorsa, F hangi koltuktadır?",
    options: ["2 veya 4", "Sadece 2", "Sadece 4", "1 veya 5"],
    correct: 0,
    timeLimit: 90,
  }, { R: 3, T: 2, B: 6, N: 2, D: 3, factor: "Gf" }),

  item({
    id: "rr6_tr",
    premise: "Üç anahtar (X, Y, Z) üç lambayı (1, 2, 3) kontrol eder — sıralama bilinmiyor. X'i çevirmek lamba 2'yi yakar. X ve Y'yi çevirmek lamba 2 ve 3'ü yakar. Üçünü birden çevirmek sadece lamba 1'i yakar.",
    question: "Z anahtarı ne kontrol eder?",
    options: [
      "Z, lamba 2 ve 3'ü söndürür, lamba 1'i yakar",
      "Z sadece lamba 1'i kontrol eder",
      "Z, lamba 1 ve 3'ü kontrol eder",
      "Belirlenemez"
    ],
    correct: 0,
    timeLimit: 90,
  }, { R: 3, T: 3, B: 6, N: 3, D: 3, factor: "Gf" }),

  item({
    id: "rr7_tr",
    premise: "Bir şifre harfleri sayılara eşler: CAB = 312, BAD = 213, ACE = 135. Her harf her zaman aynı sayıya eşlenir.",
    question: "BED'in şifresi nedir?",
    options: ["253", "235", "325", "532"],
    correct: 0,
    timeLimit: 90,
  }, { R: 3, T: 3, B: 6, N: 2, D: 3, factor: "Gf" }),

  item({
    id: "rr8_tr",
    premise: "Bir sistemde: A ve B ikisi de doğruysa, C yanlış olur. C yanlış ve D doğruysa, E doğru olur. E doğruysa, A yanlış olur. Başlangıç: A=doğru, B=doğru, D=doğru, C=doğru, E=yanlış.",
    question: "Sistem dengeye ulaştığında son değerler nedir?",
    options: [
      "A=yanlış, B=doğru, C=yanlış, D=doğru, E=doğru",
      "A=doğru, B=doğru, C=yanlış, D=doğru, E=doğru",
      "A=yanlış, B=doğru, C=doğru, D=doğru, E=yanlış",
      "Sistem salınır ve dengeye ulaşmaz"
    ],
    correct: 0,
    timeLimit: 120,
  }, { R: 4, T: 4, B: 5, N: 3, D: 4, factor: "Gf" }),

  item({
    id: "rr9_tr",
    premise: "Dört dişli sırayla birbirine geçer: A→B→C→D. A'nın 12, B'nin 8, C'nin 16, D'nin 6 dişi var. A tam 3 tur saat yönünde dönünce:",
    question: "D kaç tur döner ve hangi yöne?",
    options: [
      "12 tur saat yönünde",
      "12 tur saat yönünün tersine",
      "8 tur saat yönünde",
      "6 tur saat yönünün tersine"
    ],
    correct: 0,
    timeLimit: 120,
  }, { R: 3, T: 3, B: 6, N: 3, D: 3, factor: "Gf" }),

  item({
    id: "rr10_tr",
    premise: "Bir dizi, döngüsel olarak uygulanan üç kuralla üretilir. Kural 1: 2 ile çarp. Kural 2: 3 ekle. Kural 3: 1 çıkar. 1'den başlayarak: 1, 2, 5, 4, 8, 11, 10, 20, 23, ...",
    question: "Dizideki 12. sayı nedir?",
    options: ["44", "45", "43", "46"],
    correct: 0,
    timeLimit: 120,
  }, { R: 4, T: 4, B: 7, N: 3, D: 4, factor: "Gf" }),

  // RR11-TR
  item({
    id: "rr11_tr",
    premise: "Sekiz diplomat (A-H) yuvarlak bir masada oturuyor. Kısıtlar: (1) A, E'nin tam karşısında oturur. (2) B, C'nin yanında oturur ama D'nin yanında oturamaz. (3) F, A'nın yanındaysa G, H'nin yanında olmalıdır; değilse G, H'nin karşısında oturur. (4) D, A'dan tam 3 koltuk uzaktadır. (5) H, A veya E'nin yanında oturamaz. (6) C ve F, B ile aynı yarıda olamaz.",
    question: "B 1. koltuktaysa ve A 3. koltuktaysa, G hangi koltuktadır?",
    options: ["6", "5", "8", "2"],
    correct: 0,
    timeLimit: 180,
  }, { R: 5, T: 4, B: 8, N: 4, D: 5, factor: "Gf" }),

  // RR12-TR
  item({
    id: "rr12_tr",
    premise: "Yedi değişken (A-G) bir nedensel ağ oluşturur. Kurallar: A, 1 adım gecikmeli B'yi etkinleştirir. B ve C birlikte (ikisi >0) D'yi anında etkinleştirir. D ancak D>2 ise E'yi etkinleştirir. E, 2 adım gecikmeli A'yı sıfırlar. F = her adımda A + C. G, F>5 olduğunda aktif olur. C sabit 3'tür. t=0'da: A=4, B=0, C=3, D=0, E=0, F=7, G=1.",
    question: "t=4'te (A, D, E, G) değerleri nedir?",
    options: [
      "A=0, D=3, E=1, G=0",
      "A=4, D=3, E=1, G=1",
      "A=0, D=0, E=0, G=0",
      "A=4, D=0, E=0, G=1"
    ],
    correct: 0,
    timeLimit: 180,
  }, { R: 5, T: 5, B: 9, N: 4, D: 5, factor: "Gf" }),

  // RR13-TR
  item({
    id: "rr13_tr",
    premise: "Bir sınıflandırma sisteminde: (1) P özelliğine sahip tüm maddeler Alfa sınıfındadır. (2) Q özelliğine sahip tüm maddeler Beta sınıfındadır. (3) İstisna: hem P hem Q'ya sahip maddeler, R özelliği de yoksa Gama sınıfındadır. (4) P, Q ve R'ye sahip maddeler, S özelliği yoksa Alfa'dır; varsa Delta'dır. (5) T özelliğine de sahip tüm Delta maddeleri Gama olarak yeniden sınıflandırılır. X maddesi P, Q, R, S, T özelliklerine sahiptir.",
    question: "X maddesinin nihai sınıfı nedir?",
    options: ["Gama", "Delta", "Alfa", "Beta"],
    correct: 0,
    timeLimit: 150,
  }, { R: 5, T: 5, B: 8, N: 4, D: 5, factor: "Gf" }),
];
