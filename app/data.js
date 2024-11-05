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

export {patients};