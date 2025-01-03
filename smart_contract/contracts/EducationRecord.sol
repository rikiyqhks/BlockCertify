// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract EducationalUser {
    event Created(
        uint id,
        string studentName,
        string DOB,
        string university,
        string studentID,
        string department,
        string admissionYear,
        string graduationYear,
        string GPA,
        string studentCard,
        string diploma,
        string email,
        string phoneNumber,
        string transactionID
    );
    event UpdateIsCompleted(uint id, bool verified);

    // 学歴情報を格納する構造体
    struct EducationRecord {
        string studentName; // 学生の名前
        string DOB; // 生年月日
        string university; // 大学・専門学校
        string studentID; // 学籍番号
        string department; // 学部・学科・専攻
        string admissionYear; // 入学した年
        string graduationYear; // 卒業した年
        string GPA; // 成績評価指数・単位取得数・GPA
        string studentCard; // 学生証の写真
        string diploma; // 卒業証書の写真
        string email; // 連絡先メールアドレス
        string phoneNumber; // 連絡先電話番号
        string transactionID; // トランザクションID
        bool verified; // 検証結果
    }

    uint public recordCount = 0;
    mapping(uint => EducationRecord) public records;

    constructor() {
        createRecord(
            "\u524d\u7530\u529b\u54c9",
            "2002-04-27",
            "OCA\u5927\u962a\u30c7\u30b6\u30a4\u30f3\uff06\u30c6\u30af\u30ce\u30ed\u30b8\u30fc\u5c02\u9580\u5b66\u6821\u5b66\u6821",
            "2104240029",
            "\u30b9\u30fc\u30d1\u30fc\u30b2\u30fc\u30e0\uff29\uff34\u79d1\u30db\u30ef\u30a4\u30c8\u30cf\u30c3\u30ab\u30fc\u5c02\u653b",
            "2021-04",
            "2025-03",
            "3.0",
            "test.studentCard.com",
            "test.diploma.jp",
            "rikiya.0427vxnhfuuiy@gmail.com",
            "09039737584",
            "82dbc815-8421-4ad4-86e5-e1e6760754ca"
        );
    }

    function createRecord(
        string memory _studentName,
        string memory _DOB,
        string memory _university,
        string memory _studentID,
        string memory _department,
        string memory _admissionYear,
        string memory _graduationYear,
        string memory _GPA,
        string memory _studentCard,
        string memory _diploma,
        string memory _email,
        string memory _phoneNumber,
        string memory _transactionID
        ) public {
        recordCount++;
        records[recordCount] = EducationRecord(_studentName, _DOB, _university, _studentID, _department, _admissionYear, _graduationYear, _GPA, _studentCard, _diploma, _email, _phoneNumber, _transactionID, false);
        emit Created(recordCount, _studentName, _DOB, _university, _studentID, _department, _admissionYear, _graduationYear, _GPA, _studentCard, _diploma, _email, _phoneNumber, _transactionID);
    }

    function toggleIsCompleted(uint _id) public {
        EducationRecord memory _record = records[_id];
        _record.verified = !_record.verified;
        records[_id] = _record;
        emit UpdateIsCompleted(_id, _record.verified);
    }
}
