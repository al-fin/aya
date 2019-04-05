const readline = require('readline');
const axios = require('axios')
const colors = require('colors');

const banner = `  __ _ _   _  __ _ 
 / _\` | | | |/ _\` |
| (_| | |_| | (_| |
 \___,_|\___, |\___,_|
        __/ |      
       |___/  	Chat bot
       		Author : Alfin

=====================================`;

const bot = colors.bold.bgBlue.white(' aya ❯ ');
const key = '4198ee75-f5aa-476b-b6f3-ba6e91e35d0d';
let languange = 'id';
let namaku = '';
let jam,menit,waktu;

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const cekWaktu = () => {
	jam = new Date().getHours();
	menit = new Date().getMinutes();
	waktu = colors.yellow(`[${jam}:${menit}]`);
}

const chat = () => {
	cekWaktu();
	rl.question(waktu+' '+colors.bold.bgBlack.blue(` ${namaku} ❯ `)+' ', (message) => {
		axios.get(`http://sandbox.api.simsimi.com/request.p?key=${key}&lc=${language}&ft=0.0&text=${message}`).then(res => {
			console.log(`${waktu} ${bot} `+colors.blue(res.data.response))
			chat()
		}).catch(err => {
			console.log(err)
			rl.close()
		})
	})
}

const tanyaBahasa = () => {
	cekWaktu();
	rl.question(`${waktu} ${bot} `+colors.blue(`Hai ${namaku}, Kamu mau aku pakai bahasa apa ?`)+colors.cyan(`\n1. Bahasa Indonesia\n2. Bahasa Jawa\n`)+`${waktu} `+colors.bold.bgBlack.blue(` ${namaku} ❯ `)+' ',(lang) => {
		if (parseInt(lang)===1) {
			language = 'id';
			console.log(`${waktu} ${bot} `+colors.blue(`Oke kak !`))
			chat()
		} else if (parseInt(lang)===2) {
			language = 'jv';
			console.log(`${waktu} ${bot} `+colors.blue(`Oke mas !!`))
			chat()
		} else {
			console.log('Aku ga ngerti yang kamu katakan :(')
			tanyaBahasa()
		}
	})
}

const tanyaNama = () => {
	cekWaktu()
	rl.question(`${waktu} ${bot} `+colors.blue(`Nama kamu siapa ? `),(nama) => {
		if(nama!=="") {		
			namaku = nama.trim().replace(' ','_');
			tanyaBahasa()
		} else {
			console.log('Aku ga ngerti yang kamu katakan :(')
			tanyaNama()
		}
	})
}

console.clear()
console.log(banner.rainbow)
tanyaNama()

process.stdin.setRawMode(true);
process.stdin.on("keypress", function(chunk, key) {
  if(key && key.name === "c" && key.ctrl) {
  	console.log(colors.rainbow('\n====================================='))
    process.exit();
  }
});