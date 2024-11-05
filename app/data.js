const patients = [
    {
      "_id": "patient_id_1",
      "firstName": "Nguyễn",
      "lastName": "Văn A",
      "dob": "1980-05-15",
      "phone": "0123456789",
      "address": "123 Đường Lớn",
      "gender": "Nam",
      "Profiles": [
        {
          "profile_id": "profile_id_1",
          "treatment": "Điều trị A",
          "disease": ["Cao huyết áp"],
          "date": "2023-01-01"
        }
      ]
    },
    {
      "_id": "patient_id_2",
      "firstName": "Lê",
      "lastName": "Văn C",
      "dob": "1985-07-20",
      "phone": "0987654321",
      "address": "456 Đường Cây",
      "gender": "Nữ",
      "Profiles": [
        {
          "profile_id": "profile_id_2",
          "treatment": "Điều trị B",
          "disease": ["Suy tim"],
          "date": "2023-01-02"
        }
      ]
    },
    {
      "_id": "patient_id_3",
      "firstName": "Đặng",
      "lastName": "Thị E",
      "dob": "1970-09-25",
      "phone": "0909090909",
      "address": "789 Đại Lộ",
      "gender": "Nam",
      "Profiles": [
        {
          "profile_id": "profile_id_3",
          "treatment": "Điều trị C",
          "disease": ["Tiểu Đường"],
          "date": "2023-01-03"
        }
      ]
    }
]

const doctor = [
  {
    "_id": "doctor_id_1",
    "firstName": "Trần",
    "lastName": "Thị B",
    "dob": "1975-09-30",
    "gender": "Nữ",
    "specialize": "Đa khoa"
  },
  {
    "_id": "doctor_id_2",
    "firstName": "Phạm",
    "lastName": "Thị D",
    "dob": "1980-11-15",
    "gender": "Nam",
    "specialize": "Tim mạch"
  },
  {
    "_id": "doctor_id_3",
    "firstName": "Hoàng",
    "lastName": "Văn F",
    "dob": "1982-03-22",
    "gender": "Nữ",
    "specialize": "Huyết học"
  }
]

const appointment = [
  {
    "_id": "appointment_id_1",
    "date": "2023-01-01",
    "patient": {
      "patient_id": "patient_id_1",
      "firstName": "Nguyễn",
      "lastName": "Văn A",
      "dob": "1980-05-15",
      "phone": "0123456789",
      "gender": "Nam"
    },
    "doctor": {
      "doctor_id": "doctor_id_1",
      "firstName": "Trần",
      "lastName": "Thị B",
      "specialize": "Đa khoa"
    }
  },
  {
    "_id": "appointment_id_2",
    "date": "2023-01-02",
    "patient": {
      "patient_id": "patient_id_2",
      "firstName": "Lê",
      "lastName": "Văn C",
      "dob": "1985-07-20",
      "phone": "0987654321",
      "gender": "Nữ"
    },
    "doctor": {
      "doctor_id": "doctor_id_2",
      "firstName": "Phạm",
      "lastName": "Thị D",
      "specialize": "Tim mạch"
    }
  },
  {
    "_id": "appointment_id_3",
    "date": "2023-01-03",
    "patient": {
      "patient_id": "patient_id_3",
      "firstName": "Đặng",
      "lastName": "Thị E",
      "dob": "1970-09-25",
      "phone": "0909090909",
      "gender": "Nam"
    },
    "doctor": {
      "doctor_id": "doctor_id_3",
      "firstName": "Hoàng",
      "lastName": "Văn F",
      "specialize": "Huyết học"
    }
  }
]



export {patients, doctor, appointment};