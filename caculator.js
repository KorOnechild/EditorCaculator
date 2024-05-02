let videoList = []
let totalHour = 0;
let hourToMinute = 0;
let roundNum = 0;
let bonusMoney = 0;

// 총 계산 값
let totalMinute = 0;
let totalSecond = 0;
let totalMonthMin = 0;
let totalCalMin = 0;
let totalMoney = 0;
let totalBonus = 0;
let second = document.getElementById("second").value;


const addVideo = () => {
    second = document.getElementById("second").value;
    bonusMoney = document.getElementById("bonusMoney").value;

    let v = new Object();
    v.second = (second === '') ? second = 0 : second;
    v.bonusMoney = (bonusMoney === '') ? bonusMoney = 0 : bonusMoney;
    videoList.push(v);
    let id = videoList.length;

    let temp_html = `
                <div id=${id} class="video">
                    <div id="id">${id}</div>
                        <div id="time">
                            <span>${second}초, 추가 금액: ${bonusMoney.toLocaleString('ko-KR')}원</span>
                        </div>
                    <button id="delete" type="button" class="btn btn-outline-secondary" onclick="deleteVideo(${id})">삭제</button>
                </div>
        `;

    // let temp_html = `
    //     <li>${hour} : ${minute} : ${second}</li>
    // `;

    $("#video_list").append(temp_html);
};

const calculate = () => {
    videoList.map((i) => {
        totalSecond = totalSecond + Number(i.second);
        totalBonus = totalBonus + Number(i.bonusMoney);
    })

    console.log(totalSecond, totalBonus);

    hourToMinute = Number(totalHour) * 60;
    console.log(hourToMinute);

    totalMonthMin = (hourToMinute + totalMinute + (totalSecond / 60)).toFixed(0);
    totalCalMin = Math.round((totalMonthMin / 10).toFixed(1)); // 이번달 편집 원본영상 총 길이(초)를 10분으로 나눈 뒤 첫째자리에서 반올림
    roundNum = (totalMonthMin % 10).toFixed(0);

    totalMoney = totalCalMin * 10000;

    $("#totalMonth").text(totalMonthMin);
    $("#totalCalMin").text(totalCalMin);
    $("#totalBonus").text(totalBonus.toLocaleString('ko-KR'));
    $("#totalMoney").text(totalMoney.toLocaleString('ko-KR'));

    totalHour = 0;
    totalMinute = 0;
    totalSecond = 0;
    totalBonus = 0;
};

const removeInput = () => {
    $("#second").val(null);
    $("#bonusMoney").val(null);
};

const refresh = () => {
    totalHour = 0;
    hourToMinute = 0;
    totalMinute = 0;
    totalSecond = 0;
    totalCalMin = 0;
    totalBonus = 0;
    videoList = [];
    $("#video_list").empty();
    $("#totalMonth").text(0);
    $("#totalCalMin").text(0);
    $("#totalBonus").text(0);
    $("#totalMoney").text(0);
    removeInput();
};

const deleteVideo = (id) => {
    videoList.splice((id - 1), 1);
    $("#video_list").empty();

    videoList.map((v, i) => {
        console.log(v, i);

        let temp_html = `
                <div id=${i + 1} class="video">
                    <div id="id">${i + 1}</div>
                        <div id="time">
                        <span>${second} 초, 추가 금액: ${bonusMoney.toLocaleString('ko-KR')}원</span>
                        </div>
                    <button id="delete" type="button" class="btn btn-outline-secondary" onclick="deleteVideo(${i + 1})">삭제</button>
                </div>
            `;
        $("#video_list").append(temp_html);
    })
};