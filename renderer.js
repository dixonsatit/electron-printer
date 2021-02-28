let { remote } = require("electron");
// console.log(process.versions.electron);

const { PosPrinter } = remote.require("electron-pos-printer");
// const {PosPrinter} = require("electron-pos-printer"); //dont work in production (??)

const path = require("path");

let webContents = remote.getCurrentWebContents();
let printers = webContents.getPrinters(); //list the printers
console.log(printers);

printers.map((item, index) => {
  //write in the screen the printers for choose
  document.getElementById("list_printers").innerHTML +=
    ' <input type="radio" id="printer_' +
    index +
    '" name="printer" value="' +
    item.name +
    '"><label for="printer_' +
    index +
    '">' +
    item.name +
    "</label><br>";
});


const data = [

  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "โรงพยาบาลขอนแก่น",
    style: `text-align:center;`,
    css: { "font-weight": "700", "font-size": "18px" },
  },
  {
    type: "image",
    path: path.join(__dirname, "assets/img_test.png"), // file path
    position: "center", // position of image: 'left' | 'center' | 'right'
    width: "auto", // width of image in px; default: auto
    height: "60px", // width of image in px; default: 50 or '50px'
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
    value: "Apple ได้แก้ไขเครื่องหมายการค้าสำหรับ Final Cut Pro ซึ่งเป็นซอฟต์แวร์ตัดต่อวิดีโอระดับไฮเอนด์ ระดับมืออาชีพในลักษณะที่ชี้ให้เห็นว่าอาจมีการวางแผนที่จะเปลี่ยนรูปแบบการชำระเงินครั้งเดียวสำหรับซอฟต์แวร์ให้เป็นการสมัครสมาชิกตามรายงานของ Patently Apple เมื่อวันจันทร์ที่ผ่านมา Apple ได้เพิ่มรายชื่อ Nice Classification #42 ให้กับเครื่องหมายการค้า Final Cut Pro ในยุโรป การระบุคลาส 42 จะระบุไว้ว่ารวมถึงซอฟต์แวร์เป็นบริการ (SaaS) หรือแพลตฟอร์มเป็นบริการ (PaaS) สำหรับบริบท Microsoft Office 365 ซึ่งอิงตามการสมัครสมาชิกรายเดือนหรือรายปีจะมีรายการ Class 42 เดียวกันสำหรับชุดซอฟต์แวร์",
    css: {
      "font-size": "12px",
      "font-family": "sans-serif",
      "text-align": "center",
    },
  },
  {
    type: "barCode", // Do you think the result is ugly? Me too. Try use an image instead...
    value: "HB4587896",
    height: 12,
    width: 1,
    displayValue: true, // Display value below barcode
    fontsize: 8,
  },
  {
    type: "qrCode",
    value: "https://github.com/fssonca",
    height: 80,
    width: 80,
    style: "margin-left:50px",
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "---||",
    style: `text-align:right;`,
    css: { "font-size": "12px" },
  },
];

function date() {
  const x = new Date();

  const y = "0" + x.getHours();
  const z = "0" + x.getMinutes();
  const s = "0" + x.getSeconds();
  const h = "0" + x.getDate();
  const ano = x.getFullYear().toString().substr(-2);
  const ms = x.getMonth();
  const meses = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    y.substr(-2) +
    ":" +
    z.substr(-2) +
    ":" +
    s.substr(-2) +
    " -  " +
    h.substr(-2) +
    "/" +
    meses[ms]
  );
}

function print() {
  let printerName;
  let widthPage;

  var p = document.getElementsByName("printer");
  var w = document.getElementsByName("width");

  for (var i = 0, length = p.length; i < length; i++) {
    if (p[i].checked) {
      printerName = p[i].value;

      break;
    }
  }

  for (var i = 0, length = w.length; i < length; i++) {
    if (w[i].checked) {
      widthPage = w[i].value;

      break;
    }
  }

  console.log(printerName, widthPage);

  const options = {
    preview: true, // Preview in window or print
    width: widthPage, //  width of content body
    margin: "0 0 0 0", // margin of content body
    copies: 1, // Number of copies to print
    printerName: printerName, // printerName: string, check it at webContent.getPrinters()
    timeOutPerLine: 400,
    silent: true,
  };

  const now = {
    type: "text",
    value: "" + date(),
    style: `text-align:center;`,
    css: { "font-size": "12px", "font-family": "sans-serif" },
  };

  const d = [...data, now];

  if (printerName && widthPage) {
    PosPrinter.print(d, options)
      .then(() => { })
      .catch((error) => {
        console.error(error);
      });
  } else {
    alert("Select the printer and the width");
  }
}
