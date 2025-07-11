const Constants = {
    PROFILE_TYPES: [
        {
            id: 'V1',
            code: 'V',
            description: 'Ute',
            checks: [
                [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 0, 0, 1],
                [1, 1, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 1]
            ]
        },

        {
            id: 'V2',
            code: 'V',
            description: 'Class 1 Truck',
            checks: [
                [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 1]
            ]
        },

        {
            id: 'P1',
            code: 'P',
            description: 'Excavator',
            checks: [
                [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1],
                [0, 0, 0, 1, 1, 1]
            ]
        },

        {
            id: 'TR1',
            code: 'TR',
            description: 'Trailer',
            checks: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0, 0, 1],
                [1, 1, 1, 0, 0, 1],
                [1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0]
            ]
        }
    ],

    PROFILE_CHECKS_TEMPLATE: [
        {
            category: null,
            types: [
                'V/P'
            ],
            types_display: 'header',
            entries: [
                {
                    text: 'Engine oil level',
                    types: ['V/P']
                },
                {
                    text: 'Coolant level',
                    types: ['V/P']
                },
                {
                    text: 'Fuel levels',
                    types: ['V/P']
                },
                {
                    text: 'Hydraulic oil level',
                    types: ['V/P']
                },
                {
                    text: 'Air system / leaks',
                    types: ['V/P']
                },
                {
                    text: 'Air tanks drain',
                    types: ['V/P']
                },
                {
                    text: 'Wipers / Washers',
                    types: ['V/P']
                },
                {
                    text: 'Trailer coupling',
                    types: ['V/P']
                },
                {
                    text: 'Brakes',
                    types: ['V/P']
                },
                {
                    text: 'Handbrake',
                    types: ['V/P']
                },
                {
                    text: 'Tracks damage',
                    types: ['V/P']
                },
                {
                    text: 'Track adjustment',
                    types: ['V/P']
                },
                {
                    text: 'Grease points',
                    types: ['V/P']
                },
                {
                    text: 'Auto greasers',
                    types: ['V/P']
                }]
        },
        {
            category: 'Lights',
            types: [
                'V/P', 'TR'
            ],
            types_display: 'header',
            entries: [
                {
                    text: 'Beacon',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Brake',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Tail',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Indicators',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Head',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Day lamps',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Reflectors',
                    types: ['V/P', 'TR']
                }
            ]
        },
        {
            category: 'Tyres',
            types: [
                'V/P', 'TR'
            ],
            types_display: 'none',
            entries: [
                {
                    text: 'Tread',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Inflation',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Damage',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Wheel nuts',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Wheel nut indicators',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Mudflaps/Guards',
                    types: ['V/P', 'TR']
                }
            ]
        },
        {
            category: null, types: [
                'V/P'
            ],
            types_display: 'header',
            entries: [
                {
                    text: 'Windscreen - chipped / cracked',
                    types: ['V/P']
                },
                {
                    text: 'Reverse camera system',
                    types: ['V/P']
                },
                {
                    text: 'Reverse alarm warning',
                    types: ['V/P']
                },
                {
                    text: 'Driver & Passenger Seat belts',
                    types: ['V/P']
                },
                {
                    text: 'Cutting edges / blades / bucket teeth',
                    types: ['V/P']
                },
                {
                    text: 'Bucket blade pins & keepers',
                    types: ['V/P']
                }
            ]
        },
        {
            category: null,
            types: [
                'V/P', 'TR'
            ],
            types_display: 'inlline',
            entries: [
                {
                    text: 'Chains / Twitch',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'DG Signs',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Oversize panels',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Downer branding / ZH stickers',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Fire Ext (if fitted)',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'First aid kit (if fitted)',
                    types: ['V/P', 'TR']
                }
            ]
        }]
    ,

    CHECK_DATA_TYPES: {
        plant_no_1: 'text',
        plant_no_2: 'text',
        location_depot: 'string',

        rego_1: 'text',
        rego_2: 'text',

        rego_expiry_1: 'date',
        rego_expiry_2: 'date',
        tsl_labels_checked: 'bool',

        hubo_reading_1: 'number',
        hubo_reading_2: 'number',
        logbook_filled_in: 'bool',

        ruc_expiry_1: 'date',
        ruc_expiry_2: 'date',
        dg_sheets_filled_in: 'bool',

        speedo_reading: 'number',
        pre_check_ewp: 'bool',

        hour_reading: 'number',
        wof_cof_1: 'date',

        service_due: 'date',
        wof_cof_2: 'date',

    }
}