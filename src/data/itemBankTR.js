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

  // WD7-TR: Nadir, bilişsel kavram
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
  }, { R: 1, T: 1, B: 3, N: 3, D: 3, factor: "Gc" }),

  // WD8-TR: Çok nadir, felsefi
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
  }, { R: 1, T: 1, B: 3, N: 3, D: 4, factor: "Gc" }),

  // WD9-TR: Meta-dilbilimsel
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
  }, { R: 1, T: 1, B: 3, N: 3, D: 4, factor: "Gc" }),

  // WD10-TR: Nadir bilişsel/algısal kavram
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
  }, { R: 1, T: 1, B: 3, N: 3, D: 4, factor: "Gc" }),
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
];
