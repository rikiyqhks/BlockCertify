//SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract CertifyIssuing {

    // 学歴情報を格納する構造体
    struct EducationRecord {
        string studentName; // 学生の名前
        uint DOB; // 生年月日
        string university; // 大学・専門学校
        uint studentID; // 学籍番号
        string department; // 学部・学科・専攻
        uint admissionYear; // 入学した年
        uint graduationYear; // 卒業した年
        uint GPA; // 成績評価指数・単位取得数・GPA
        string studentCard; // 学生証の写真
        string diploma; // 卒業証書の写真
        string email; // 連絡先メールアドレス
        uint phoneNumber; // 連絡先電話番号
        string transactionID; // トランザクションID
        bool verified; // 検証結果
    }

    mapping (address => EducationRecord) public educationRecords;

    event EducationRecordRegistered(address indexed studentAddress, string studentName, uint DOB, string university, uint studentID, string department, uint admissionYear, uint graduationYear, uint GPA, string studentCard, string diploma, string email, uint phoneNumber, string transactionID);
    event EducationRecordVerified(address indexed studentAddress);

    function registerEducationRecord(string memory _studentName, uint _DOB, string memory _university, uint _studentID, string memory _department, uint _admissionYear, uint _graduationYear, uint _GPA, string memory _studentCard, string memory _diploma, string memory _email, uint _phoneNumber, string memory _transactionID) public {
        EducationRecord storage record = educationRecords[msg.sender];
        require(bytes(record.studentName).length == 0, "Education record already registered");

        record.studentName = _studentName;
        record.DOB = _DOB;
        record.university = _university;
        record.studentID = _studentID;
        record.department = _department;
        record.admissionYear = _admissionYear;
        record.graduationYear = _graduationYear;
        record.GPA = _GPA;
        record.studentCard = _studentCard;
        record.diploma = _diploma;
        record.email = _email;
        record.phoneNumber = _phoneNumber;
        record.transactionID = _transactionID;

        emit EducationRecordRegistered(msg.sender, _studentName, _DOB, _university, _studentID, _department, _admissionYear, _graduationYear, _GPA, _studentCard, _diploma, _email, _phoneNumber, _transactionID);
    }

    function verifyEducationRecord(address _studentAddress) public {
        require(msg.sender == _studentAddress || educationRecords[_studentAddress].verified == false, "Cannot verify education record");

        educationRecords[_studentAddress].verified = true;
        emit EducationRecordVerified(_studentAddress);
    }}