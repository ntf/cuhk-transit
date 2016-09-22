/**
 * @author ntf
 * data extracted from spreadsheet prepared by Jonathan L. 
 */
export let routes = {};
export let stops = {};
export let buildings = {};

export class BusStop {
    constructor(name, schedules) {
        this.name = name;
        this.schedules = schedules;
        this.nearest = [];
    }

    getBuses() {
        return Object.keys(this.schedules).map(function (key) {
            return routes[key];
        });
    };

    addNearest(stop: BusStop) {
        this.nearest.push(stop);
        stop.nearest.push(this);
    }
}

export class Building {
    constructor(name, nearest) {
        this.name = name;
        this.nearest = nearest;
    }
}


const rawStops = [
    new BusStop("Area 39", { "4": 3 }),
    new BusStop("C.W. Chu College", { "3": 7, "4": [2, 4], "5": 9, "6B": 1, "8": 1 }),
    new BusStop("Chan Chun Ha Hostel", { "3": 10, "4": 7, "6B": 3, "8": 3 }),
    new BusStop("Chung Chi Teaching Blocks", { "5": 1, "6A": 6, "6B": 9, "7": 8 }),
    new BusStop("Entrance Piazza", { "2": 1, "3": 15, "6A": 5, "6B": 8, "7": 7 }),
    new BusStop("Fung King-hey Building", { "2": 3, "3": 4, "5": 4 }),
    new BusStop("Jockey Club Postgraduate Hall", { "1B": [2, 7] }),
    new BusStop("New Asia College", { "2": 5, "4": 10, "5": 6, "6A": 1, "6B": 4, "7": 3, "8": 8 }),
    new BusStop("S.H. Ho College", { "1A": 5, "1B": 6, "2": 8, "3": 14, "4": 13, "6A": 4, "6B": 7, "7": 6 }),
    new BusStop("Shaw College", { "3": [6, 11], "4": 8, "5": 8, "7": 1, "8": [4, 11] }),
    new BusStop("Sir Run Run Shaw Hall", { "1A": 3, "1B": 4, "3": 3, "5": 3 }),
    new BusStop("United College", { "2": [4, 6], "4": 11, "5": 5, "6A": 2, "6B": 5, "7": 4, "8": 9 }),
    new BusStop("United College Staff Residence", { "3": 9, "4": 6, "6B": 2, "8": 2 }),
    new BusStop("University Administration Building", { "1A": 4, "1B": 5, "2": 7, "3": 13, "4": 12, "6A": 3, "6B": 6, "7": 5, "8": 6 }),
    new BusStop("University MTR Station", { "1A": [1, 6], "1B": [1, 8], "2": 9, "4": 14 }),
    new BusStop("University Residences No. 15", { "3": 8, "4": 5 }),
    new BusStop("University Residences No. 3 & 4", { "3": [5, 12], "4": 9, "5": 7, "7": 2, "8": [5, 10] }),
    new BusStop("University Science Centre", { "8": 7 }),
    new BusStop("University Sports Centre", { "1A": 2, "1B": 3, "2": 2, "3": 2, "5": 2 }),
    new BusStop("Yasumoto International Academic Park - YIA", { "3": 1, "4": 1 })
];

const addToRoute = function(element) {
    if (routes[this[0]] === undefined) {
        routes[this[0]] = [];
    }
    routes[this[0]][element - 1] = this[1];
};

for (let i = 0; i < rawStops.length; i++) {
    const stop = rawStops[i];
    stops[stop.name] = stop;
    for (var bus in stop.schedules) {
        if (stop.schedules.hasOwnProperty(bus)) {
            (Array.isArray(stop.schedules[bus]) ? stop.schedules[bus] : [stop.schedules[bus]]).forEach(addToRoute, [bus, stop]);
        }
    }
}

stops["University Administration Building"].addNearest(stops["Sir Run Run Shaw Hall"]);
stops["Entrance Piazza"].addNearest(stops["Yasumoto International Academic Park - YIA"]);


const rawBuildings = `University MTR Station	15, 20
Academic Building No. 1	14
Academic Building No. 2	7	
Adam Schall Residence	3	
An Integrated Teaching Building - AIT	20	
Art Museum	14	
Art Museum Conservation Annex	14	
Basic Medical Sciences Building Teaching Annex	11, 18	
Benjamin Franklin Centre	14	
Bethlehem Hall	3	
C.W. Chu College Student Hostel	2	
C.W. Chu College Student Hostel	2	
Ch'ien Mu Library - CML	8	
Chan Chun Ha Hall	9, 19	
Chan Chun Ha Hostel	3	
Chan Kwan Tung Inter-University Hall	9, 19	
Chen Kou Bun Building - CKB	4	
Cheng Ming Building - NAA	8	
Cheng Yu Tung Building - CYT	5	
Cheung Chuk Shan Amenities Building	12	
Chiangs Building (Postgraduate Hall No. 2)	9, 19	
Chih Hsing Hall	8	
Cho Yiu Conference Hall	14	
Choh-Ming Li Basic Medical Sciences Building - BMS	11, 18	
Chung Chi College Administration Building	4, 5	
Chung Chi College Chapel - CCCC	4	
Chung Chi Tang	20	
Daisy Li Hall	8	
Dorothy and Ti-Hua KOO Building	3	
East Wing of the Art Museum - AMEW	14	
Elisabeth Luce Moore Library	4, 20	
Estates and Maintenance Building Annex	9, 19	
Estates Management Office Headquarters	9, 19	
Esther Lee Building - ELB	4, 5	
Fok Ying Tung Remote Sensing Science Building	8	
Fong Shu Chuen Building	20	
Fong Yun Wah Hall	20	
Friendship Lodge	8	
Fung King Hey Building - KHB	6	
Grace Tien Hall	8	
Hang Seng Hall	3	
Ho Sin-Hang Engineering Building - SHB	14	
Ho Tim Building - HTB	4	
Ho Tim Hall	9, 19	
Hong Kong Institute of Biotechnology	7	
Hua Lien Tang	9, 19	
Huen Wing Ming Building	10	
Hui Yeung Shing Building - HYS	4	
Humanities Building - NAH	8	
Hyatt Regency Hong Kong, Shatin	5	
Ina Ho Chan Un Chan Building	2	
Institute of Chinese Studies - ICS	14	
Inter-University Hall (Postgraduate Hall No.3)	5	
International House 1	13	
International House 2	13	
International House 3	11, 18	
Jockey Club Postgraduate Hall	7	
John Fulton Centre	14	
Kuo Mou Hall (High Block)	10	
Kuo Mou Hall (Low Block)	10	
Kwok Sports Building - KSB	9, 19	
Lady Ho Tung Hall	9, 19	
Lady Shaw Building - LSB	14	
Lee Hysan Concert Hall	4, 5	
Lee Quo Wei Hall	9, 19	
Lee Shau Kee Building - LSK	6	
Lee Shu Pui Hall	20	
Lee Woo Sing College North Block	3	
Leung Kau Kui Building - KKB	6	
Li Dak Sum Building - LDS	6	
Li Dak Sum Yip Yio Chin Building	6	
Li Wai Chun Building	4	
Lingnan Stadium - LN	5, 15	
Lo Kwee-Seong Integrated Biomedical Building	1	
Madam S.H. Ho Hall	9, 19	
Marina Tse Chu Building	2	
Maurice R. Greenberg Building	9, 19	
Ming Hua Tang	9, 19	
Minor Staff Quarters 1	11, 18	
Minor Staff Quarters 2	11, 18	
Mong Man Wai Building - MMW	11, 18	
Morningside College Student Hostel (High Block)	9, 19	
Nissen Huts	7	
Orchid Lodge	4	
Panacea Lodge	11, 18	
Pentecostal Mission Hall Complex (High Block)	9, 19	
Pentecostal Mission Hall Complex (Low Block)	9, 19	
Physical Geography Experimental Station	20	
Pi Ch'iu Building - HCA	11	
Pommerenke Student Centre	4, 11, 19	
Postgraduate Hall No. 4	13	
Postgraduate Hall No. 5	13	
Postgraduate Hall No. 6	13	
President Chi-tung Yung Memorial Building	13	
Run Run Shaw Science Building	14	
Satellite Remote Sensing Receiving Station	8	
Satellite Remote Sensing Receiving Station	7	
Science Centre East Block - SCE	11, 18	
Security and Transport Building	14	
Shanghai Fraternity Association Research Services Centre	20	
Shaw College Lecture Theatre - SWC LT	10	
Shaw College Student Hostel 2 (Low Block)	10	
Si Yuan Amphitheatre	3	
Simon F.S. Li Marine Science Laboratory Simon F.S. Li Building	7	
Sino Building - SB	4	
Sir Run Run Shaw Hall - RRS	11	
Sports Field Annex 1	9, 19	
Staff Club	4	
Staff Quarters A	11, 14, 19	
Staff Quarters B	11, 14, 19	
Staff Quarters C	11, 14, 19	
Staff Quarters D	11, 14, 19	
Staff Quarters E	5	
Staff Quarters G	11, 14, 19	
Staff Quarters S	20	
Staff Student Centre - Leung Hung Kee Building	8	
Sui Loong Pao Building	11	
T.C. Cheng Building - UCC	12	
Theology Building - CCT	14	
Tin Ka Ping Building	6	
Tsang Shiu Tim Building - UCA	12	
U.C. Staff Residence	13	
United College Wu Chung Multimedia Library	12	
University Administration Building	14	
University Health Centre	9, 19	
University Library	6	
University Residence No. 10	16	
University Residence No. 11	16	
University Residence No. 12	16	
University Residence No. 13	16	
University Residence No. 14	16	
University Residence No. 15	16	
University Residence No. 16	16	
University Residence No. 17	16	
University Residence No. 3	17	
University Residence No. 4	17	
University Science Centre - SC	9, 19	
University Sports Centre	9, 19	
Vice-Chancellor's Residence	14	
Water Sports Centre	7	
Wen Chih Tang	11,19	
Wen Lan Tang - WLS	10	
Wen Lin Tang	9, 19	
West Wing of the Art Museum	14	
William M.W. Mong Engineering Building - ERB	14	
Wong Foo Yuan Building - FYB	4	
Wu Ho Man Yuen Building - WMY	20	
Wu Yee Sun College Activity Centre	17	
Wu Yee Sun College Student Hostel East Block	17	
Wu Yee Sun College Student Hostel West Block	17	
Xuesi Hall	8	
Y.C. Liang Hall - LHC	11	
Ya Qun Lodge	10	
Yali Guest House	9, 19	
Yasumoto International Academic Park - YIA	20	
Yat Sen Hall	10	
Ying Lin Tang	20`;

rawBuildings.split("\n").forEach(function (line) {
    let columns = line.split("\t");
    let name = columns[0].trim();
    let stops = columns[1].split(",").map(Function.prototype.call, String.prototype.trim);
    let buses = [];
    for (let i = 0; i < stops.length; i++) {
        buses.push(rawStops[stops[i] - 1]);
    }
    buildings[name] = new Building(name, buses);
});

