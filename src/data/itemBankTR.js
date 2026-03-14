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
    analogy: "Palamut, Meşe'nin başlangıcıysa; Koza, ___'ın başlangıcıdır",
    options: ["Kelebek", "İpek", "Tırtıl", "Ağaç"],
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

  // CL7-TR: Süreç→yapı — bozucu süreç yapıyı aşındırır
  item({
    id: "cl7_tr",
    analogy: "Entropi, Düzen'i bozarsa; Erozyon, ___'ı bozar",
    options: ["Arazi", "Su", "Toprak", "Jeoloji"],
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

  // CL9-TR: Biçimsel yapı→somutlaşma — kural sistemi alanı kısıtlar
  item({
    id: "cl9_tr",
    analogy: "Gramer, Dil'i kısıtlarsa; Algoritma, ___'ı kısıtlar",
    options: ["Hesaplama", "Matematik", "Yazılım", "Mantık"],
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

  // CL10b-TR: Üretici mekanizma→alan — doğal seçilim biyolojiyi üretir
  // R=4, T=3, B=5, N=4, D=5
  item({
    id: "cl10b_tr",
    analogy: "Doğal Seçilim, Biyoloji için neyse; Piyasa Güçleri, ___ için odur",
    options: ["Ekonomi", "Kapitalizm", "Ticaret", "Servet"],
    correct: 0,
    timeLimit: 75,
  }, { R: 4, T: 3, B: 5, N: 4, D: 5, factor: "Gc" }),

  // CL10c-TR: Profilaktik paradoks — tehdidi kullanarak tehdidi önleme
  // b = 2.15, IQ ~132
  item({
    id: "cl10c_tr",
    analogy: "Aşı, Hastalık için neyse; Kontrollü Yakma, ___ için odur",
    options: ["Orman Yangını", "Orman", "İtfaiyecilik", "Duman"],
    correct: 0,
    timeLimit: 75,
  }, { R: 3, T: 3, B: 5, N: 4, D: 3, factor: "Gc" }),

  // CL11-TR: Çapraz-alan yapısal değişmez — sistem kendi sınırıyla karşılaşıyor
  item({
    id: "cl11_tr",
    analogy: "Gödel'in Eksiklik Teoremi, Biçimsel Sistemler için neyse; Cantor'un Köşegenlemesi, ___ için odur",
    options: ["Sonsuz Kümeler", "Reel Sayılar", "Sayma", "Paradokslar"],
    correct: 0,
    timeLimit: 90,
  }, { R: 4, T: 4, B: 6, N: 5, D: 5, factor: "Gc" }),

  // CL11b-TR: Çapraz-alan üretici ilişki — kıtlık değer üretir, belirsizlik bilgi üretir
  // b = 3.15, IQ ~147
  item({
    id: "cl11b_tr",
    analogy: "Kıtlık, Değer için neyse; Belirsizlik, ___ için odur",
    options: ["Bilgi", "Risk", "Olasılık", "Kaygı"],
    correct: 0,
    timeLimit: 90,
  }, { R: 4, T: 4, B: 5, N: 4, D: 4, factor: "Gc" }),

  // CL12-TR: İkinci-derece yapısal değişmez — basit tekrar → emergent düzen
  item({
    id: "cl12_tr",
    analogy: "İterasyon, Fraktallar için neyse; Geri Besleme, ___ için odur",
    options: ["Homeostaz", "Salınım", "Güçlendirme", "Kontrol"],
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

  // WD15-TR: Kültür-bağımsız, disiplinlerarası kavram
  // R=2, T=2, B=4, N=4, D=4
  item({
    id: "wd15_tr",
    question: "'Propriosepsiyon' en doğru olarak ne anlama gelir?",
    options: [
      "Kişinin kendi bedeninin uzaydaki konumunu ve hareketini algılama duyusu",
      "Başkalarının duygularını ince ipuçlarından sezme yetisi",
      "Kendi düşünce süreçlerinin farkındalığının artması",
      "Çevresel duyusal bilginin bilinçdışı işlenmesi"
    ],
    correct: 0,
    timeLimit: 75,
  }, { R: 2, T: 2, B: 4, N: 4, D: 4, factor: "Gc" }),

  // WD16-TR: Soyutu somutmuş gibi ele alma hatası
  // R=2, T=2, B=4, N=4, D=5
  item({
    id: "wd16_tr",
    question: "'Şeyleştirme' (reifikasyon) en doğru olarak ne anlama gelir?",
    options: [
      "Soyut bir kavramı sanki somut, elle tutulur bir şeymiş gibi ele alma",
      "Karmaşık fikirleri iletişim için kasıtlı olarak basitleştirme",
      "İnsan dışı varlıklara insani özellikler atfetme",
      "Örtük bilgiyi açık ve kodlanmış hale getirme süreci"
    ],
    correct: 0,
    timeLimit: 75,
  }, { R: 2, T: 2, B: 4, N: 4, D: 5, factor: "Gc" }),

  // WD11-TR: Nadir retorik terim
  // R=2, T=2, B=4, N=5, D=5
  item({
    id: "wd11_tr",
    question: "'Enthymeme' (entimem) klasik retorikte en doğru olarak ne anlama gelir?",
    options: [
      "Bir öncülün açıkça belirtilmediği, ima yoluyla bırakıldığı kıyas",
      "Kesin bir sonuca ulaşmayan bir argüman",
      "Sonucun öncülü yeniden ifade ettiği bir akıl yürütme biçimi",
      "İkna aracı olarak kullanılan örtük bir karşılaştırma"
    ],
    correct: 0,
    timeLimit: 75,
  }, { R: 2, T: 2, B: 4, N: 5, D: 5, factor: "Gc" }),

  // WD12-TR: Gerçek felsefi terim — epistemolojik kavram
  // R=2, T=2, B=4, N=5, D=5
  item({
    id: "wd12_tr",
    question: "'Solipsizm' katı felsefi anlamıyla en doğru olarak ne anlama gelir?",
    options: [
      "Yalnızca kişinin kendi zihninin kesin olarak var olduğunun bilinebileceği görüşü",
      "Tüm bilginin nihayetinde duyusal deneyimden türediği görüşü",
      "Gerçekliğin temelde fiziksel değil zihinsel olduğu inancı",
      "Dış bilginin güvenilirliğine ilişkin felsefi şüphe"
    ],
    correct: 0,
    timeLimit: 75,
  }, { R: 2, T: 2, B: 4, N: 5, D: 5, factor: "Gc" }),
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
      "6 tur saat yönünün tersine",
      "12 tur saat yönünde",
      "8 tur saat yönünde",
      "12 tur saat yönünün tersine"
    ],
    correct: 0,
    timeLimit: 120,
  }, { R: 3, T: 3, B: 6, N: 3, D: 3, factor: "Gf" }),

  item({
    id: "rr10_tr",
    premise: "Bir dizi, döngüsel olarak uygulanan üç kuralla üretilir. Kural 1: 2 ile çarp. Kural 2: 3 ekle. Kural 3: 1 çıkar. 1'den başlayarak: 1, 2, 5, 4, 8, 11, 10, 20, 23, ...",
    question: "Dizideki 12. sayı nedir?",
    options: ["47", "44", "46", "45"],
    correct: 0,
    timeLimit: 120,
  }, { R: 4, T: 4, B: 7, N: 3, D: 4, factor: "Gf" }),

  // RR10b-TR: Durum-döngülü graf geçişi
  item({
    id: "rr10b_tr",
    premise: "Beş oda (1-5) bir döngüde bağlıdır: 1↔2↔3↔4↔5↔1, ayrıca kısayollar 1↔3 ve 2↔4. Her odanın döngüsel bir durumu var: Kırmızı→Yeşil→Mavi→Kırmızı. Başlangıç durumları: [Kırmızı, Yeşil, Mavi, Kırmızı, Yeşil]. Bir robot Oda 1'de başlar (oda Yeşil'e döner). Robot her zaman alfabetik olarak en erken duruma sahip komşu odaya gider (M<K<Y). Beraberlikte düşük numaralı oda seçilir. Ziyaret edilen odanın durumu ileri döner.",
    question: "7 hareketten sonra robot hangi odadadır?",
    options: ["5", "3", "1", "2"],
    correct: 0,
    timeLimit: 180,
  }, { R: 4, T: 4, B: 8, N: 4, D: 4, factor: "Gf" }),

  // RR10c-TR: Çok-kurallı oylama sistemi
  item({
    id: "rr10c_tr",
    premise: "Yedi komite üyesi (P, Q, R, S, T, U, V) şu kurallarla oy kullanır: (1) P'nin veto hakkı var — P karşı çıkarsa teklif reddedilir. (2) Teklif ≥4 evet oyuyla geçer. (3) Q her zaman R ile aynı oy kullanır. (4) S ve T her zaman birbirinin tersi oy kullanır. (5) U ancak P evet oyu verirse VE {Q, R}'den en az biri evet oyu verirse evet oyu verir. (6) V, {Q, R, S} çoğunluğunun tersini oy olarak kullanır.",
    question: "P, Q ve S hepsi evet oyu verirse, toplam kaç üye evet oyu verir?",
    options: ["5", "4", "6", "3"],
    correct: 0,
    timeLimit: 150,
  }, { R: 5, T: 4, B: 7, N: 4, D: 4, factor: "Gf" }),

  // RR11-TR
  item({
    id: "rr11_tr",
    premise: "Sekiz diplomat (A-H) yuvarlak bir masada oturuyor. Kısıtlar: (1) A, E'nin tam karşısında oturur. (2) B, C'nin yanında oturur ama D'nin yanında oturamaz. (3) F, A'nın yanındaysa G, H'nin yanında olmalıdır; değilse G, H'nin karşısında oturur. (4) D, A'dan tam 3 koltuk uzaktadır. (5) H, A veya E'nin yanında oturamaz. (6) C ve F, B ile aynı yarıda olamaz.",
    question: "B 1. koltuktaysa ve A 3. koltuktaysa, G hangi koltuktadır?",
    options: ["4", "6", "8", "2"],
    correct: 0,
    timeLimit: 180,
  }, { R: 5, T: 4, B: 8, N: 4, D: 5, factor: "Gf" }),

  // RR12-TR
  item({
    id: "rr12_tr",
    premise: "Yedi değişken (A-G) bir nedensel ağ oluşturur. Bir değişken etkinleştirildiğinde, bir kural onu açıkça değiştirene kadar etkin kalır. Kurallar: A, 1 adım gecikmeli B'yi etkinleştirir. B ve C birlikte (ikisi >0) D'yi anında etkinleştirir. D ancak D>2 ise E'yi etkinleştirir. E, 2 adım gecikmeli A'yı sıfırlar. F = her adımda A + C. G, F>5 olduğunda aktif olur. C sabit 3'tür. t=0'da: A=4, B=0, C=3, D=0, E=0, F=7, G=1.",
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
