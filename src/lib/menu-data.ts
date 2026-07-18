export type MenuItem = {
  name: string;
  nameEn: string;
  desc?: string;
  descEn?: string;
  imageUrl: string;
  price: number;
};

export type MenuCategory = {
  id: string;
  label: string;
  labelEn: string;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: "breakfast",
    label: "الفطور",
    labelEn: "Breakfast",
    items: [
      { name: "فطور فالير عربي", nameEn: "Arabic Valier Breakfast", desc: "مجموعة متنوعة من الفطور مثل: البيض والسلطات الموسمية", descEn: "A variety of breakfast items including eggs and seasonal salads", imageUrl: "", price: 40 },
      { name: "فطور إنتركونتنتال", nameEn: "Intercontinental Breakfast", desc: "مجموعة متنوعة من الكروسان المشكل والمربى والزبدة", descEn: "Assorted croissants, jam, and butter", imageUrl: "", price: 40 },
      { name: "أوملت مكس جبنة", nameEn: "Cheese Omelette", desc: "بيض مخفوق مع إضافة الجبن", descEn: "Scrambled eggs with cheese", imageUrl: "", price: 25 },
      { name: "أوملت سادة", nameEn: "Plain Omelette", desc: "بيض مخفوق بدون إضافات", descEn: "Plain scrambled eggs", imageUrl: "", price: 22 },
      { name: "سلة كروسان", nameEn: "Croissant Basket", desc: "مجموعة من قطع الكروسان", descEn: "A selection of croissants", imageUrl: "", price: 22 },
    ],
  },
  {
    id: "desserts",
    label: "الحلويات",
    labelEn: "Desserts",
    items: [
      { name: "لافا شوكليت", nameEn: "Chocolate Lava", desc: "كيكة شوكولاته محشية بصوص الكاكاو مع قطعة من الآيس كريم", descEn: "Chocolate cake filled with cocoa sauce, served with ice cream", imageUrl: "", price: 28 },
      { name: "شوكليت براونيز", nameEn: "Chocolate Brownies", desc: "قطع البراونيز المغطى بالشوكولاته مع آيس كريم الفانيليا والفواكه المشكلة", descEn: "Brownies topped with chocolate, vanilla ice cream and mixed fruits", imageUrl: "", price: 28 },
      { name: "بان كيك", nameEn: "Pancake", desc: "حلى يجمع بين قوام الكريب الهش المغطى بطبقة غنية من الشوكولاتة", descEn: "Fluffy pancake topped with rich chocolate", imageUrl: "", price: 28 },
      { name: "وافل", nameEn: "Waffle", desc: "حلى يُحضّر ويُشوى في قوالب خاصة ليأخذ نقشته المميزة", descEn: "Freshly baked waffle with signature patterns", imageUrl: "", price: 28 },
      { name: "كريب شوكلاته", nameEn: "Chocolate Crepe", desc: "حلى يجمع بين قوام الكريب الناعم المغطى بطبقة غنية من الشوكولاتة", descEn: "Soft crepe topped with rich chocolate", imageUrl: "", price: 30 },
      { name: "تشيز كيك نكهات", nameEn: "Assorted Cheesecake", desc: "طبقة من البسكويت وطبقة من الكريمة اللذيذة", descEn: "Biscuit base with creamy topping", imageUrl: "", price: 25 },
      { name: "كوكيز دبل شوكليت", nameEn: "Double Chocolate Cookies", desc: "كوكيز غني بنكهة الشوكولاتة المزدوجة", descEn: "Cookies rich in double chocolate flavor", imageUrl: "", price: 8 },
      { name: "بقلاوة مع آيس كريم", nameEn: "Baklava with Ice Cream", desc: "حلوى شهية من طبقات رقيقة وداخلها مكسرات وآيس كريم", descEn: "Delicate layered pastry with nuts, served with ice cream", imageUrl: "", price: 28 },
    ],
  },
  {
    id: "shisha",
    label: "المعسلات",
    labelEn: "Shisha",
    items: [
      { name: "تفاحتين فاخر", nameEn: "Premium Two Apples", imageUrl: "", price: 45.5 },
      { name: "تفاحتين مكس", nameEn: "Two Apples Mix", imageUrl: "", price: 45.5 },
      { name: "تفاحتين نخلة", nameEn: "Nakhla Two Apples", imageUrl: "", price: 45.5 },
      { name: "عنب توت", nameEn: "Grape Berry", imageUrl: "", price: 45.5 },
      { name: "عنب نعناع", nameEn: "Grape Mint", imageUrl: "", price: 45.5 },
      { name: "ليمون نعناع", nameEn: "Lemon Mint", imageUrl: "", price: 45.5 },
      { name: "شيشة عدني", nameEn: "Adeni Shisha", imageUrl: "", price: 45.5 },
    ],
  },
  {
    id: "soft",
    label: "مشروبات غازية",
    labelEn: "Soft Drinks",
    items: [
      { name: "ماء", nameEn: "Water", imageUrl: "", price: 7 },
      { name: "مياه غازية", nameEn: "Sparkling Water", imageUrl: "", price: 12 },
      { name: "بيبسي", nameEn: "Pepsi", imageUrl: "", price: 10 },
      { name: "بيبسي دايت", nameEn: "Diet Pepsi", imageUrl: "", price: 10 },
      { name: "سفن آب", nameEn: "7 Up", imageUrl: "", price: 10 },
      { name: "سفن آب دايت", nameEn: "Diet 7 Up", imageUrl: "", price: 10 },
      { name: "موسي سادة", nameEn: "Plain Mousse", imageUrl: "", price: 18 },
      { name: "كود رد", nameEn: "Code Red", imageUrl: "", price: 20 },
    ],
  },
  {
    id: "hot",
    label: "المشروبات الساخنة",
    labelEn: "Hot Drinks",
    items: [
      { name: "شاي أحمر", nameEn: "Black Tea", imageUrl: "", price: 8 },
      { name: "شاي أخضر", nameEn: "Green Tea", imageUrl: "", price: 8 },
      { name: "شاي كرك", nameEn: "Karak Tea", imageUrl: "", price: 10 },
      { name: "براد شاي أخضر", nameEn: "Green Tea Pot", imageUrl: "", price: 25 },
      { name: "براد شاي مغربي", nameEn: "Moroccan Tea Pot", imageUrl: "", price: 25 },
      { name: "براد شاي أحمر", nameEn: "Black Tea Pot", imageUrl: "", price: 25 },
      { name: "قهوة تركي", nameEn: "Turkish Coffee", imageUrl: "", price: 15 },
      { name: "قهوة تركي حليب", nameEn: "Turkish Coffee with Milk", imageUrl: "", price: 17 },
      { name: "قهوة اليوم", nameEn: "Coffee of the Day", imageUrl: "", price: 18 },
      { name: "قهوة أمريكي", nameEn: "Americano", imageUrl: "", price: 18 },
      { name: "قهوة فرنسي", nameEn: "French Coffee", imageUrl: "", price: 18 },
      { name: "دلة قهوة عربي", nameEn: "Arabic Coffee Pot", imageUrl: "", price: 28 },
      { name: "موكا حار", nameEn: "Hot Mocha", desc: "صوص الشوكولاته الداكنة مع دبل إسبريسو والحليب", descEn: "Dark chocolate sauce with double espresso and milk", imageUrl: "", price: 18 },
      { name: "لاتيه حار", nameEn: "Hot Latte", imageUrl: "", price: 18 },
      { name: "كابتشينو", nameEn: "Cappuccino", imageUrl: "", price: 18 },
      { name: "هوت شوكلت", nameEn: "Hot Chocolate", imageUrl: "", price: 18 },
      { name: "كورتادو", nameEn: "Cortado", imageUrl: "", price: 18 },
      { name: "فلات وايت", nameEn: "Flat White", imageUrl: "", price: 18 },
      { name: "ماتشا لاتيه", nameEn: "Matcha Latte", desc: "حليب الشوفان مع سيرب وماتشا", descEn: "Oat milk with syrup and matcha", imageUrl: "", price: 22 },
      { name: "سبانش لاتيه حار", nameEn: "Hot Spanish Latte", desc: "حليب مكثف مع دبل إسبريسو وحليب مسخن", descEn: "Condensed milk with double espresso and steamed milk", imageUrl: "", price: 20 },
      { name: "إسبريسو سنجل", nameEn: "Single Espresso", imageUrl: "", price: 15 },
      { name: "إسبريسو دبل", nameEn: "Double Espresso", imageUrl: "", price: 17 },
      { name: "إسبريسو رومانو", nameEn: "Espresso Romano", desc: "دبل إسبريسو مع عصرة ليمون", descEn: "Double espresso with a splash of lemon", imageUrl: "", price: 18 },
      { name: "إسبريسو بلو بيري", nameEn: "Blueberry Espresso", desc: "دبل إسبريسو مع التوت الأزرق", descEn: "Double espresso with blueberry", imageUrl: "", price: 18 },
      { name: "إسبريسو توت أحمر", nameEn: "Red Berry Espresso", desc: "دبل إسبريسو مع التوت البري الأحمر", descEn: "Double espresso with red cranberry", imageUrl: "", price: 18 },
      { name: "موكاتشينو", nameEn: "Mochaccino", desc: "شوكولاتة داكنة مع فوم الحليب والحليب والإسبريسو", descEn: "Dark chocolate with milk foam, milk, and espresso", imageUrl: "", price: 18 },
      { name: "كراميل ميكاتو", nameEn: "Caramel Macchiato", desc: "الإسبريسو مع الكراميل صوص والحليب", descEn: "Espresso with caramel sauce and milk", imageUrl: "", price: 18 },
      { name: "حار V60", nameEn: "Hot V60", imageUrl: "", price: 20 },
    ],
  },
  {
    id: "fresh",
    label: "عصائر فريش",
    labelEn: "Fresh Juices",
    items: [
      { name: "عصير الفواكه الموسمية", nameEn: "Seasonal Fruit Juice", desc: "يتكون من الفواكه الموسمية", descEn: "Made with seasonal fruits", imageUrl: "", price: 25 },
      { name: "عصير ليمون سادة", nameEn: "Plain Lemon Juice", desc: "خلطة ليمون تمتاز بالحمضية الحلوة والمنعشة", descEn: "A refreshing sweet-tangy lemon blend", imageUrl: "", price: 25 },
      { name: "عصير ليمون ونعناع", nameEn: "Lemon Mint Juice", desc: "خلطة ليمون ونعناع تجمع بين حموضة الليمون وانتعاش النعناع", descEn: "Lemon and mint combining tanginess and freshness", imageUrl: "", price: 25 },
      { name: "عصير البطيخ", nameEn: "Watermelon Juice", desc: "مشروب من لب البطيخ الطازج بنكهته الحلوة وترطيبه العالي", descEn: "Fresh watermelon, sweet and hydrating", imageUrl: "", price: 25 },
      { name: "عصير مانجو", nameEn: "Mango Juice", desc: "قوام كثيف وناعم وطعم فاكهي ورائحة منعشة", descEn: "Thick smooth texture with fresh fruity aroma", imageUrl: "", price: 25 },
      { name: "عصير موز", nameEn: "Banana Juice", desc: "طعم الموز الحلو الكريمي مع قوام ناعم", descEn: "Sweet creamy banana with smooth texture", imageUrl: "", price: 25 },
      { name: "عصير أفوكادو", nameEn: "Avocado Juice", desc: "الأفوكادو مع التمر والمكسرات بقوام مخملي", descEn: "Avocado with dates and nuts, velvety texture", imageUrl: "", price: 25 },
      { name: "عصير برتقال", nameEn: "Orange Juice", desc: "مشروب فريش يتميز بحمضية البرتقال الحلوة", descEn: "Fresh drink with sweet orange tang", imageUrl: "", price: 25 },
      { name: "عصير أناناس", nameEn: "Pineapple Juice", desc: "طعم حلو لاذع بإحساس استوائي منعش", descEn: "Sweet tangy tropical refreshment", imageUrl: "", price: 25 },
      { name: "عصير كانتلوب", nameEn: "Cantaloupe Juice", desc: "نكهة حلوة وقوام ناعم وترطيب عالٍ", descEn: "Sweet flavor with smooth hydrating texture", imageUrl: "", price: 25 },
      { name: "عصير رمان", nameEn: "Pomegranate Juice", desc: "لون أحمر جذاب وطعم غني", descEn: "Vivid red color with rich taste", imageUrl: "", price: 25 },
      { name: "عصير فراولة", nameEn: "Strawberry Juice", desc: "قوام خفيف ومنعش ولون وردي بنكهة فاكهية", descEn: "Light refreshing pink fruit juice", imageUrl: "", price: 25 },
      { name: "عصير كوكتيل", nameEn: "Cocktail Juice", desc: "قوام كثيف غني بالفيتامينات والسكر الطبيعي", descEn: "Thick, rich in vitamins and natural sugar", imageUrl: "", price: 25 },
    ],
  },
  {
    id: "cold",
    label: "المشروبات الباردة",
    labelEn: "Cold Drinks",
    items: [
      { name: "لافوا آيس كوفي", nameEn: "Lavoa Iced Coffee", desc: "حليب مع قهوة الإسبريسو بنكهة البلوبيري", descEn: "Milk with espresso and blueberry flavor", imageUrl: "", price: 25 },
      { name: "V60", nameEn: "V60", imageUrl: "", price: 25 },
      { name: "آيس أمريكانو", nameEn: "Iced Americano", imageUrl: "", price: 23 },
      { name: "آيس موكا", nameEn: "Iced Mocha", desc: "صوص الشوكولاتة الداكنة مع الإسبريسو والحليب", descEn: "Dark chocolate sauce with espresso and milk", imageUrl: "", price: 23 },
      { name: "آيس شوكلت", nameEn: "Iced Chocolate", desc: "سموذي الشوكلت مع الحليب", descEn: "Chocolate smoothie with milk", imageUrl: "", price: 23 },
      { name: "آيس ماتشا لاتيه", nameEn: "Iced Matcha Latte", desc: "حليب الشوفان مع سيرب القيقب والماتشا الاحتفالية", descEn: "Oat milk with maple syrup and ceremonial matcha", imageUrl: "", price: 25 },
      { name: "آيس كراميل لاتيه", nameEn: "Iced Caramel Latte", desc: "الإسبريسو مع صوص الكراميل والحليب", descEn: "Espresso with caramel sauce and milk", imageUrl: "", price: 23 },
      { name: "آيس سبانيش لاتيه", nameEn: "Iced Spanish Latte", desc: "حليب مكثف مع الحليب والإسبريسو", descEn: "Condensed milk with milk and espresso", imageUrl: "", price: 25 },
      { name: "آيس لاتيه", nameEn: "Iced Latte", desc: "حليب مع الإسبريسو", descEn: "Milk with espresso", imageUrl: "", price: 23 },
      { name: "آيس وايت موكا", nameEn: "Iced White Mocha", desc: "صوص الشوكولاتة البيضاء مع الحليب والإسبريسو", descEn: "White chocolate sauce with milk and espresso", imageUrl: "", price: 23 },
      { name: "آيس فرابتشينو", nameEn: "Iced Frappuccino", desc: "قهوة مخفوقة بخيارات نكهات كراميل موكا فانيليا", descEn: "Blended coffee with caramel, mocha, or vanilla", imageUrl: "", price: 23 },
      { name: "آيس بستاشيو لاتيه", nameEn: "Iced Pistachio Latte", desc: "صوص الفستق والحليب مع الإسبريسو", descEn: "Pistachio sauce and milk with espresso", imageUrl: "", price: 25 },
      { name: "آيس إسبريسو كولادا", nameEn: "Iced Espresso Colada", imageUrl: "", price: 23 },
      { name: "آيس أوريو موكا", nameEn: "Iced Oreo Mocha", desc: "قطع الأوريو المخلوطة مع الحليب وصوص الشوكولاتة الداكنة", descEn: "Blended Oreo pieces with milk and dark chocolate sauce", imageUrl: "", price: 23 },
    ],
  },
  {
    id: "mojito",
    label: "موهيتو",
    labelEn: "Mojito",
    items: [
      { name: "موهيتو بلو بيري", nameEn: "Blueberry Mojito", desc: "مشروب غازي بنكهة التوت الأزرق", descEn: "Sparkling drink with blueberry flavor", imageUrl: "", price: 25 },
      { name: "موهيتو روز بيري", nameEn: "Rose Berry Mojito", desc: "مشروب غازي مع التوت الأحمر", descEn: "Sparkling drink with red berry", imageUrl: "", price: 25 },
      { name: "موهيتو حبحب", nameEn: "Watermelon Mojito", desc: "مشروب غازي مع الحبحب", descEn: "Sparkling drink with watermelon", imageUrl: "", price: 25 },
      { name: "موهيتو فراولة", nameEn: "Strawberry Mojito", desc: "مشروب غازي مع فراولة", descEn: "Sparkling drink with strawberry", imageUrl: "", price: 25 },
      { name: "موهيتو ليمون نعناع", nameEn: "Lemon Mint Mojito", desc: "مشروب غازي مع ليمون ونعناع", descEn: "Sparkling drink with lemon and mint", imageUrl: "", price: 25 },
      { name: "موهيتو كيوي", nameEn: "Kiwi Mojito", desc: "مشروب غازي مع كيوي", descEn: "Sparkling drink with kiwi", imageUrl: "", price: 25 },
      { name: "موهيتو ليمون جنجر", nameEn: "Lemon Ginger Mojito", desc: "مشروب غازي مع ليمون وجنجر", descEn: "Sparkling drink with lemon and ginger", imageUrl: "", price: 25 },
      { name: "موهيتو برتقال", nameEn: "Orange Mojito", desc: "مشروب غازي مع برتقال", descEn: "Sparkling drink with orange", imageUrl: "", price: 25 },
      { name: "موهيتو فراولة برتقال", nameEn: "Strawberry Orange Mojito", desc: "مشروب غازي مع برتقال وفراولة", descEn: "Sparkling drink with orange and strawberry", imageUrl: "", price: 25 },
      { name: "موهيتو باشن فروت", nameEn: "Passion Fruit Mojito", desc: "مشروب غازي مع باشن فروت", descEn: "Sparkling drink with passion fruit", imageUrl: "", price: 25 },
      { name: "موهيتو كلاسيك", nameEn: "Classic Mojito", desc: "مشروب غازي مميز", descEn: "Signature sparkling drink", imageUrl: "", price: 25 },
      { name: "موهيتو سفن آب", nameEn: "7 Up Mojito", desc: "سفن آب مع نكهة", descEn: "7 Up with flavor", imageUrl: "", price: 25 },
    ],
  },
  {
    id: "milkshake",
    label: "ميلك شيك",
    labelEn: "Milkshake",
    items: [
      { name: "ميلك شيك فراولة", nameEn: "Strawberry Milkshake", desc: "آيس كريم مخلوط مع حبات الفراولة", descEn: "Ice cream blended with strawberries", imageUrl: "", price: 25 },
      { name: "ميلك شيك فانيليا", nameEn: "Vanilla Milkshake", desc: "آيس كريم الحليب بنكهة الفانيليا", descEn: "Milk ice cream with vanilla flavor", imageUrl: "", price: 25 },
      { name: "ميلك شيك شوكليت", nameEn: "Chocolate Milkshake", desc: "آيس كريم بنكهة الشوكولاته", descEn: "Chocolate flavored ice cream", imageUrl: "", price: 25 },
      { name: "ميلك شيك بينك", nameEn: "Pink Milkshake", desc: "آيس كريم مخلوط مع نكهات", descEn: "Ice cream blended with mixed flavors", imageUrl: "", price: 25 },
      { name: "ميلك شيك أوريو", nameEn: "Oreo Milkshake", desc: "آيس كريم بخلطة الأوريو", descEn: "Ice cream blended with Oreo", imageUrl: "", price: 25 },
    ],
  },
];
