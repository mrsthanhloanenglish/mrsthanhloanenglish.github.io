


// URL của Google Sheet CSV
const sheetId = '1ULpKy8M10z9PG8IElWkAcaHG_Hd0u_Bu57GYGBBCBh4'; // Thay YOUR_GOOGLE_SHEET_ID bằng ID Google Sheet của bạn
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
        
// Tạo các mảng cho các class
let class1 = [];
let class2 = [];
let class3 = [];
let class4 = [];
let class5 = [];
let class6 = [];
let class7 = [];
let class8 = [];
let class9 = [];
let class10 = [];
let class11 = [];
let class12 = [];
let classielst = [];
let image1 = [];
let image2 = [];
let image3 = [];
let image4 = [];
let image5 = [];
let image6 = [];
let image7 = [];
let image8 = [];
let image9 = [];
let image10 = [];
let image11 = [];
let image12 = [];
let imageielst = [];
let isDataLoaded = false; // Thêm cờ đánh dấu khi dữ liệu được tải
// Hàm lấy dữ liệu từ Google Sheet CSV
fetch(url)
    .then(response => response.text())
    .then(csvData => {
        const rows = csvData.split('\n').slice(1); // Bỏ dòng tiêu đề
        const classes = [class1, class2, class3, class4, class5, class6, class7, class8, class9, class10, class11, class12, classielst];
        const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, imageielst];

        // Duyệt qua từng hàng của CSV
        rows.forEach(row => {
            const columns = row.split(',');

            if (columns.length >= 26) { // Kiểm tra đủ số lượng cột
                for (let i = 0; i < 13; i++) { // Có 13 class và 13 images
                    const classValue = columns[i * 2].replace(/['"]/g, '').trim(); // Cột class
                    const imageValue = columns[i * 2 + 1].replace(/['"]/g, '').trim(); // Cột image
                    
                    // Chỉ thêm nếu không rỗng
                    if (classValue) classes[i].push(classValue);
                    if (imageValue) images[i].push(imageValue);
                }
            }
        });

        isDataLoaded = true; // Đặt cờ khi dữ liệu được tải
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

const speakButton = document.getElementById('speakButton');
const stopButton = document.getElementById('stopButton');
const classSelect = document.getElementById('standard-select');
const recordButton = document.getElementById('recordButton');
const changeWordButton = document.getElementById('changeWordButton'); // Nút đổi từ
const resultDiv = document.getElementById('result');
const wordToPronounceElement = document.getElementById('wordToPronounce');
const imgElement = document.getElementById('img_topronounce');
let message = 'Duongcheck!';
let wordToPronounce = wordToPronounceElement.innerText;
// Mảng các từ đã lưu sẵn (sửa tay)
let wordList = [];
let imgList = [];
classSelect.addEventListener('change', (event) => {
        if (!isDataLoaded) { // Kiểm tra xem dữ liệu đã tải chưa
        //console.log("Dữ liệu chưa được tải!");
        return;
    }
    const selectedClass = event.target.value;

    // Đặt màu nền tùy theo giá trị đã chọn
    switch (selectedClass) {
        case '1':  // Class 1
            wordList= class1;
            imgList= image1;
            break;
        case '2':  // Class 2
            wordList= class2;
            imgList= image2;
            break;
        case '3':  // Class 3
            wordList= class3;
            imgList= image3;
            break;
        case '4':  // Class 4
            wordList= class4;
            imgList= image4;
            break;
        case '5':  // Class 5
            wordList= class5;
            imgList= image5;
            break;
        case '6':  // Class 5
            wordList= class6;
            imgList= image6;
            break;
        case '7':  // Class 5
            wordList= class7;
            imgList= image7;
            break;
        case '8':  // Class 5
            wordList= class8;
            imgList= image8;
            break;
        case '9':  // Class 5
            wordList= class9;
            imgList= image9;
            break;
        case '10':  // Class 5
            wordList= class10;
            imgList= image10;
            break;
        case '11':  // Class 5
            wordList= class11;
            imgList= image11;
            break;
        case '12':  // Class 5
            wordList= class12;
            imgList= image12;
            break;
        case 'ielst':  // Class 5
            wordList= classielst;
            imgList= imageielst;
            break;
        default:   // Mặc định không đổi màu
            wordList= [];
    }
     if (wordList.length > 0) {
        wordToPronounce = wordList[0];  // Lấy từ đầu tiên của mảng mới
        imgElement.src= imgList[0];
        wordToPronounceElement.innerText = wordToPronounce;  // Cập nhật hiển thị
        wordsToPronounce = wordToPronounce.toLowerCase().split(' ');  // Cập nhật mảng từ cần phát âm
        resultDiv.innerHTML = '';  // Xóa kết quả cũ nếu có
    } else {
        wordToPronounceElement.innerText = '';  // Nếu không có từ, để trống
        imgElement.src='';
    }
});


// Tách các từ ra thành mảng
let wordsToPronounce = wordToPronounce.toLowerCase().split(' ');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';  // Ngôn ngữ nhận diện
//recognition.lang = 'zh-CN';  // Ngôn ngữ nhận diện

recordButton.addEventListener('click', () => {
    if ((wordList.length == 0) || (document.getElementById('student_name').value === ''))
    {
        showCustomAlert();
        return;
    }
    document.getElementById("recordButton").style.backgroundColor = "#b3b3b3";
    recognition.start();  // Bắt đầu ghi âm
});

stopButton.addEventListener('click', () => {
    document.getElementById("recordButton").style.backgroundColor = "#4CAF50";
    recognition.stop(); 
});

recognition.onresult = function(event) {
    recordButton.innerHTML = 'Start Recording';
    const transcript = event.results[0][0].transcript.toLowerCase();
    resultDiv.innerHTML = `You Just Pronounced: <b>${transcript}</b>`;
    recordButton.innerHTML = 'Start Recording';
    recognition.stop();  // Dừng ghi âm sau khi có kết quả
    document.getElementById("recordButton").style.backgroundColor = "#4CAF50";
    // Tách các từ được phát âm ra thành mảng
    const spokenWords = transcript.split(' ');

    // Tính số từ đúng
    let correctWords = 0;
    wordsToPronounce.forEach((word, index) => {
        if (spokenWords[index] && spokenWords[index] === word) {
            correctWords++;
        }
    });
    // Tính điểm trên thang điểm 10
    const score = (correctWords / wordsToPronounce.length) * 10;
    resultDiv.innerHTML += `<br>Your Point: <b>${score.toFixed(1)}/10</b>`;
    message = `${studentname}: ${score.toFixed(1)}đ : (${transcript} / ${wordToPronounce} )`
    //sendMessage();

    // Đưa ra phản hồi dựa trên điểm
    if (score === 10) {
        resultDiv.innerHTML += `<br> <h2 style="color: green">🎉 Good, very good pronunciation! </h2>`;
    } else if (score >= 7) {
        resultDiv.innerHTML += `<br> <h2 style="color: #ff730b">👍 Pretty good, but still needs improvement.</h2>`;
    } else {
        resultDiv.innerHTML += `<br>❌ <h2 style="color: red"> Incorrect pronunciation. </h2>`;
    }
};

recognition.onerror = function(event) {
    resultDiv.innerHTML = 'Error occurred in recognition: ' + event.error;
    document.getElementById("recordButton").style.backgroundColor = "#4CAF50";
};

// Đổi từ cần phát âm khi nhấn nút "Đổi từ khác"
changeWordButton.addEventListener('click', () => {
    if (wordList.length == 0)
    {
        showCustomAlert();
        return;
    }
    // Ví dụ gọi hàm để lấy từ tiếp theo
    getNextWord();
    getNextImg();
    // Cập nhật nội dung của thẻ h2
    wordToPronounceElement.innerText = wordToPronounce;

    // Cập nhật lại mảng wordsToPronounce
    wordsToPronounce = wordToPronounce.toLowerCase().split(' ');

    // Xóa kết quả cũ
    resultDiv.innerHTML = '';
});

let currentIndex = 0;
let currentIndex_img = 0;

function getNextImg() {
    imgElement.src = imgList[currentIndex_img];
    currentIndex_img = (currentIndex_img + 1) % imgList.length; // Khi đến hết danh sách, quay lại từ đầu
}

function getNextWord() {
    wordToPronounce = wordList[currentIndex];
    currentIndex = (currentIndex + 1) % wordList.length; // Khi đến hết danh sách, quay lại từ đầu
}
speakButton.addEventListener('click', () => {
    if (wordToPronounce) {
        speak(wordToPronounce); // Gọi hàm phát âm
    }
});

// Hàm phát âm sử dụng Web Speech API
function speak(text) {
    responsiveVoice.speak(text, "US English Female");
}

function showCustomAlert() {
        document.getElementById('customAlert').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }

    function closeCustomAlert() {
        document.getElementById('customAlert').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }
