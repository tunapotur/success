const turkceKarakterler = "ğüşöçıİĞÜŞÖÇ";
const ingilizceKarakterler = "gusociIGUSOC";
const karakterMap = new Map();
for (let i = 0; i < turkceKarakterler.length; i++) {
  karakterMap.set(turkceKarakterler[i], ingilizceKarakterler[i]);
}

module.exports = {
  turkishToEnglish: (cumle) => {
    let yeniStr = "";
    for (let i = 0; i < cumle.length; i++) {
      const karakter = cumle[i];
      yeniStr += karakterMap.has(karakter)
        ? karakterMap.get(karakter)
        : karakter;
    }

    return yeniStr;
  },
};
