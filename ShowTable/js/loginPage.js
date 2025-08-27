const $loginPage = document.getElementById('loginPage');


// 创建标题
const $title = document.createElement('h1');
$title.textContent = 'Do you wish to enter the Wired?';
$title.style.textAlign = 'center';
$title.style.fontSize = '45px';
$title.style.marginBottom = '4vh';
$title.style.marginTop = '5vh';

// 创建 form 元素
const $form = document.createElement('form');
$form.style.maxWidth = '400px';
$form.style.margin = 'auto';

// 创建表格
const $table = document.createElement('table');
$table.style.width = '100%';
$table.style.borderCollapse = 'collapse';


// 创建容器
const $sheetContainer =  document.createElement('div');
$sheetContainer.className = 'sheetContainer';

// 工具函数：创建一行
function createRow(labelText, inputElement) {
    const $row = document.createElement('tr');

    const $labelTd = document.createElement('td');
    const $label = document.createElement('label');
    $label.textContent = labelText;
    $labelTd.appendChild($label);

    const $inputTd = document.createElement('td');
    $inputTd.appendChild(inputElement);

    $row.appendChild($labelTd);
    $row.appendChild($inputTd);

    return $row;
}




// 用户名输入框
const $usernameInput = document.createElement('input');
$usernameInput.type = 'text';
$usernameInput.name = 'username';
$usernameInput.required = true;
$usernameInput.style.cssText = 'width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;';

// 邮箱输入框
const $emailInput = document.createElement('input');
$emailInput.type = 'email';  // 内置邮箱格式校验
$emailInput.name = 'email';
$emailInput.required = true;
$emailInput.placeholder = '请输入邮箱地址';
$emailInput.style.cssText = $usernameInput.style.cssText;


// 密码输入框
const $passwordInput = document.createElement('input');
$passwordInput.type = 'password';
$passwordInput.name = 'password';
$passwordInput.id = 'password';
$passwordInput.placeholder = '密码允许6~18个字符，允许出现特殊字符';
$passwordInput.minLength = 6;
$passwordInput.maxLength = 18;
$passwordInput.required = true;
$passwordInput.style.cssText = $usernameInput.style.cssText;

// 确认密码
const $confirmPasswordInput = document.createElement('input');
$confirmPasswordInput.type = 'password';
$confirmPasswordInput.name = 'confirmPassword';
$confirmPasswordInput.id = 'confirmPassword';
$confirmPasswordInput.minLength = 6;
$confirmPasswordInput.maxLength = 18;
$confirmPasswordInput.required = true;
$confirmPasswordInput.style.cssText = $usernameInput.style.cssText;

// 密码强度条和文本
const $strengthRow = document.createElement('tr');
const $strengthLabel = document.createElement('td');
$strengthLabel.innerHTML = '<label>密码强度</label>';

const $strengthTd = document.createElement('td');
const $strengthBox = document.createElement('div');
$strengthBox.style.cssText = 'display: flex; align-items: center; gap: 10px;';

const $barContainer = document.createElement('div');
$barContainer.style.cssText = 'flex: 70%; margin-bottom: 8px; background: #eee; border-radius: 12px; height: 16px;';
const $strengthBar = document.createElement('div');
$strengthBar.id = 'strength-bar';
$strengthBar.style.cssText = 'width: 5%; background: gray; height: 100%; border-radius: 12px;';
$barContainer.appendChild($strengthBar);

const $strengthText = document.createElement('span');
$strengthText.id = 'strength-text';
$strengthText.textContent = 'Too Short';
$strengthText.style.cssText = 'flex: 30%; margin-bottom: 8px;';

$strengthBox.appendChild($barContainer);
$strengthBox.appendChild($strengthText);
$strengthTd.appendChild($strengthBox);
$strengthRow.appendChild($strengthLabel);
$strengthRow.appendChild($strengthTd);

// 提交按钮
const $submitRow = document.createElement('tr');
const $submitTd = document.createElement('td');
$submitTd.colSpan = 2;
$submitTd.style.textAlign = 'center';

const $submitButton = document.createElement('button');
$submitButton.type = 'submit';
$submitButton.className = 'submitButton';

$submitButton.addEventListener('mouseover', () => $submitButton.style.backgroundColor = '#d2738a');
$submitButton.addEventListener('mouseout', () => $submitButton.style.backgroundColor = 'black');
$submitTd.appendChild($submitButton);
$submitRow.appendChild($submitTd);

// 加入容器
$table.appendChild(createRow('用户名：', $usernameInput));
$table.appendChild(createRow('邮箱：', $emailInput));
$table.appendChild(createRow('密码：', $passwordInput));
$table.appendChild($strengthRow);
$table.appendChild(createRow('确认密码：', $confirmPasswordInput));
$table.appendChild($submitRow);


// 添加表单
$form.appendChild($table);
$sheetContainer.appendChild($form);





// 挂载到页面
$loginPage.appendChild($title);
$loginPage.appendChild($sheetContainer);

// ========================= JS逻辑 =========================




// 密码强度检查函数
function checkPasswordStrength(pwd) {
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
}

// 更新密码强度显示
function updateStrengthBar(strength) {
    const widthList = ['10%', '30%', '60%', '90%'];
    const colorList = ['red', 'orange', 'yellowgreen', 'green'];
    const labelList = ['Very Weak', 'Weak', 'Medium', 'Strong'];

    const width = widthList[strength - 1] || '5%';
    const color = colorList[strength - 1] || 'gray';
    const label = labelList[strength - 1] || 'Too Short';

    $strengthBar.style.width = width;
    $strengthBar.style.background = color;
    $strengthText.textContent = label;
}

// 监听密码输入实时更新
$passwordInput.addEventListener('input', () => {
    const pwd = $passwordInput.value;
    const strength = checkPasswordStrength(pwd);
    updateStrengthBar(strength);
});

// 表单验证提交
$form.addEventListener('submit', (event) => {
    event.preventDefault(); // 阻止默认提交

    const username = $usernameInput.value.trim();
    const pwd = $passwordInput.value;
    const confirmPwd = $confirmPasswordInput.value;
    const strength = checkPasswordStrength(pwd);

    if (pwd !== confirmPwd) {
        alert('密码和确认密码不一致！');
        resetPasswords();
        return;
    }

    if (strength < 2) {
        alert('密码太弱，请设置更复杂的密码！');
        resetPasswords();
        return;
    }

    //  使用 jQuery AJAX 发请求
    $.ajax({
        url: 'https://mock.apipost.net/mock/4feb7973901f/auth/register?apipost_id=4fd0c4f39007',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            password: pwd
        }),
        success: function (response) {
            console.log('注册成功:', response);
            alert('注册成功，欢迎进入连线世界！');
            switchPage('homePage', 'Index');
        },
        error: function (xhr, status, error) {
            console.error('注册失败:', error);
            alert('注册失败，请稍后重试');
        }
    });
});

// 密码重置小函数
function resetPasswords() {
    $passwordInput.value = '';
    $confirmPasswordInput.value = '';
    updateStrengthBar(0);
    $passwordInput.focus();
}

