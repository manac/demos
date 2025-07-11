const Data = {
    USERS: {
        1234: {
            first_name: 'Mana',
            last_name: 'Coromandel'
        },
        1235: {
            first_name: 'John',
            last_name: 'Smith'
        }
    },

    EQUIPMENT: [
        {
            profile_type: 'V1',
            plant_no_1: 2984,
            rego_1: 'TX901',
            rego_expiry_1: '2025-08-14',
            hubo_reading_1: 1243546,
            ruc_expiry_1: '2026-10-14',
            speedo_reading: 43543,
            hour_reading: 11111,
            service_due: '2026-10-1',

            plant_no_2: 1984,
            rego_2: 'TX902',
            rego_expiry_2: '2026-08-14',
            hubo_reading_2: 2243546,
            ruc_expiry_2: '2027-10-14',

            wof_cof_1: '2027-01-01',
            wof_cof_2: '2027-02-02',

            tsl_labels_checked: false,
            logbook_filled_in: true,
            dg_sheets_filled_in: false,
            pre_check_ewp: true,

            checks: {}
        },
        {
            profile_type: 'V2',
            plant_no_1: 'N/A',
            rego_1: 'NBK954',
            rego_expiry_1: '2026-08-15',
            hubo_reading_1: 0,
            ruc_expiry_1: '2026-10-14',
            speedo_reading: 0,
            hour_reading: 130000,
            service_due: '2025-08-15',

            plant_no_2: 'N/A',
            rego_2: 'N/A',
            rego_expiry_2: 'N/A',
            hubo_reading_2: 'N/A',
            ruc_expiry_2: 'N/A',

            wof_cof_1: '2025-10-11',
            wof_cof_2: 'N/A',

            tsl_labels_checked: false,
            logbook_filled_in: true,
            dg_sheets_filled_in: false,
            pre_check_ewp: true,

            checks: {}
        }
    ]


}

//Search by brand, vehicke type, rego, plant_number
Data.searchBy = (key, value) => {

}