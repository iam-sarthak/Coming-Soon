function handelchange() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("result-box").style.display = "none";
  document.getElementById("result-box-message").innerHTML = "";
}

function predictRank() {
  var percentile = document.getElementById("percentile").value;
  document.getElementById("result-box").style.display = "none";
  var cat;
  if (document.getElementById("inlineRadio4").checked) {
    cat = "GEN";
  } else if (document.getElementById("inlineRadio1").checked) {
    cat = "OBC";
  } else if (document.getElementById("inlineRadio2").checked) {
    cat = "SC";
  } else if (document.getElementById("inlineRadio3").checked) {
    cat = "ST";
  }
  if (isNaN(percentile)) {
    document.getElementById("result-box-message").innerHTML =
      "Invalid Percentile!";
    document.getElementById("result-box-message").style.color = "red";
  } else {
    if (percentile <= 0 || percentile > 100) {
      document.getElementById("result-box-message").innerHTML =
        "Invalid Percentile!";
      document.getElementById("result-box-message").style.color = "red";
    } else {
      document.getElementById("loading").style.display = "block";
      document.getElementById("rank").innerHTML = "Calculating...";

      var rank = 1119889 - (percentile / 100) * (1119889 + 1);
      rank = Math.round(rank);
      if (rank <= 0) rank = 1;
      //   console.log(rank);
      var upperRank = rank + 10;
      var lowerRank = rank - 10;

      var cat_rank;
      var catupperRank = 0;
      var catlowerRank = 0;

      if (upperRank > 1119889) upperRank = 1119889;
      if (lowerRank <= 0) lowerRank = 1;

      if (cat === "GEN") {
        cat_rank = rank;
        catupperRank = upperRank;
        catlowerRank = lowerRank;
      } else if (cat === "OBC") {
        var idx;
        for (let i = 0; i < 242; i++) {
          if (crl_Ranks[i] > rank && obc_ranks[i] !== -1) {
            if (i > 0 && obc_ranks[i - 1] !== -1) {
              idx = i - 1;
            } else {
              idx = i;
            }
            break;
          }
        }
        cat_rank = obc_ranks[idx];
        // console.log(crl_Ranks[idx]);
        var error = Math.round(Math.abs(rank - crl_Ranks[idx]) * 0.3589641);
        // console.log(error);
        if (crl_Ranks[idx] <= rank) {
          catupperRank = cat_rank + error;
          catlowerRank = cat_rank;
        } else {
          catupperRank = cat_rank;
          catlowerRank = cat_rank - error;
        }

        if (catlowerRank <= 0) catlowerRank = 1;
        if (catupperRank > 402000) catupperRank = 402000;
        if (catupperRank <= 0) catupperRank = 1;
      } else if (cat === "ST") {
        var idx;
        for (let i = 0; i < 242; i++) {
          if (crl_Ranks[i] > rank && st_ranks[i] !== -1) {
            if (i > 0 && st_ranks[i - 1] !== -1) {
              idx = i - 1;
            } else {
              idx = i;
            }
            break;
          }
        }
        cat_rank = st_ranks[idx];
        // console.log(crl_Ranks[idx]);
        var error = Math.round(Math.abs(rank - crl_Ranks[idx]) * 0.0311414);
        // console.log(error);
        if (crl_Ranks[idx] <= rank) {
          catupperRank = cat_rank + error;
          catlowerRank = cat_rank;
        } else {
          catupperRank = cat_rank;
          catlowerRank = cat_rank - error;
        }

        if (catlowerRank <= 0) catlowerRank = 1;
        if (catupperRank > 34875) catupperRank = 34875;
        if (catupperRank <= 0) catupperRank = 1;
      } else if (cat === "SC") {
        var idx;
        for (let i = 0; i < 242; i++) {
          if (crl_Ranks[i] > rank && sc_ranks[i] !== -1) {
            if (i > 0 && sc_ranks[i - 1] !== -1) {
              idx = i - 1;
            } else {
              idx = i;
            }
            break;
          }
        }
        cat_rank = sc_ranks[idx];
        // console.log(crl_Ranks[idx]);
        var error = Math.round(Math.abs(rank - crl_Ranks[idx]) * 0.0873881);
        // console.log(error);
        if (crl_Ranks[idx] <= rank) {
          catupperRank = cat_rank + error;
          catlowerRank = cat_rank;
        } else {
          catupperRank = cat_rank;
          catlowerRank = cat_rank - error;
        }

        if (catlowerRank <= 0) catlowerRank = 1;
        if (catupperRank > 402000) catupperRank = 97865;
      }
      setTimeout(function () {
        document.getElementById("loading").style.display = "none";
        document.getElementById("rank").innerHTML = "Predict Rank";
        document.getElementById("result-box").style.display = "block";
        document.getElementById("category").innerHTML = cat;
        document.getElementById("result-percentile").innerHTML = percentile;
        document.getElementById("result-crl").innerHTML =
          lowerRank + " - " + upperRank;
        document.getElementById("result-cat-rank").innerHTML =
          catlowerRank + " - " + catupperRank;
      }, 3000);
    }
  }
}

var CRL_percentile = [
  100, 99.999, 99.998, 99.995, 99.993, 99.992, 99.991, 99.99, 99.98, 99.97,
  99.96, 99.95, 99.94, 99.93, 99.92, 99.91, 99.9, 99.89, 99.88, 99.87, 99.86,
  99.85, 99.84, 99.83, 99.82, 99.81, 99.8, 99.79, 99.78, 99.77, 99.76, 99.75,
  99.74, 99.73, 99.72, 99.71, 99.7, 99.69, 99.68, 99.67, 99.66, 99.65, 99.64,
  99.63, 99.62, 99.61, 99.6, 99.59, 99.58, 99.57, 99.56, 99.55, 99.54, 99.53,
  99.52, 99.51, 99.5, 99.49, 99.48, 99.47, 99.46, 99.45, 99.44, 99.43, 99.42,
  99.41, 99.4, 99.39, 99.38, 99.37, 99.36, 99.35, 99.34, 99.33, 99.32, 99.31,
  99.3, 99.29, 99.28, 99.27, 99.26, 99.25, 99.24, 99.23, 99.22, 99.21, 99.2,
  99.19, 99.18, 99.17, 99.16, 99.15, 99.14, 99.13, 99.12, 99.11, 99.1, 99.09,
  99.08, 99.07, 99.06, 99.05, 99.04, 99.03, 99.02, 99.01, 99, 98.9, 98.8, 98.7,
  98.6, 98.5, 98.4, 98.3, 98.2, 98.1, 98, 97.9, 97.8, 97.7, 97.6, 97.5, 97.4,
  97.3, 97.2, 97.1, 97, 96.9, 96.8, 96.7, 96.6, 96.5, 96.4, 96.3, 96.2, 96.1,
  96, 95.9, 95.8, 95.7, 95.6, 95.5, 95.4, 95.3, 95.2, 95.1, 95, 94, 93, 92, 91,
  90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72,
  71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53,
  52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34,
  33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15,
  14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
];

var crl_Ranks = [
  17, 29, 37, 78, 113, 122, 144, 154, 240, 352, 470, 590, 717, 832, 950, 1064,
  1171, 1299, 1398, 1509, 1611, 1728, 1841, 1947, 2078, 2190, 2284, 2406, 2533,
  2643, 2762, 2868, 2962, 3074, 3181, 3299, 3409, 3516, 3641, 3749, 3875, 3983,
  4115, 4228, 4316, 4436, 4537, 4643, 4769, 4849, 4960, 5075, 5195, 5298, 5413,
  5534, 5644, 5760, 5846, 5946, 6065, 6181, 6274, 6391, 6489, 6620, 6739, 6834,
  6959, 7080, 7194, 7298, 7411, 7520, 7627, 7737, 7849, 7960, 8071, 8168, 8274,
  8409, 8511, 8636, 8754, 8861, 8977, 9083, 9159, 9287, 9420, 9512, 9639, 960,
  9865, 9946, 10041, 10213, 10329, 10429, 10530, 10645, 10750, 10876, 10995,
  11105, 11188, 11794, 12899, 14023, 15173, 16274, 17336, 18447, 19524, 20650,
  21809, 22819, 23826, 24907, 26011, 27160, 28202, 29243, 30346, 31453, 32508,
  33529, 34612, 35680, 36793, 37836, 38826, 39878, 40919, 42049, 43101, 44166,
  45171, 46104, 47183, 48393, 49492, 50634, 51695, 52786, 53671, 59465, 70098,
  80792, 91491, 101974, 112467, 123135, 133840, 144851, 156310, 166992, 177666,
  188675, 199872, 210859, 222320, 233412, 244057, 255443, 267013, 278863,
  289206, 299621, 311432, 324862, 336208, 347433, 359291, 368425, 378080,
  388194, 401092, 413527, 424685, 436936, 446901, 457728, 469775, 481427,
  493026, 502145, 512354, 524415, 534797, 547508, 557883, 566437, 581303,
  592265, 599327, 611209, 620657, 630943, 643014, 651675, 663145, 674677,
  685508, 695484, 702595, 711707, 722138, 731123, 741778, 754941, 766144,
  774186, 783853, 793198, 800366, 809859, 819023, 828109, 841357, 850135,
  857359, 868505, 876923, 885088, 893060, 902652, 913821, 922414, 928386,
  935899, 944623, 954264, 964195, 971352, 978666, 986830, 995386, 1003486,
  1011472, 1019388,
];

var obc_ranks = [
  -1, -1, -1, -1, -1, -1, -1, -1, 35, -1, -1, 89, -1, 113, -1, -1, 169, 189,
  202, 224, 247, 268, -1, 305, 328, 333, -1, 383, 398, 434, 444, 463, 466, 486,
  498, 520, 541, 560, 593, 607, 626, 650, -1, 698, 710, 739, -1, 770, 791, 814,
  839, 863, 881, 897, -1, 943, 966, 990, 1005, 1034, 1058, 1081, 1088, 1114,
  1141, 1160, -1, 1209, 1222, 1265, 1294, 1322, 1350, 1369, 1398, 1418, 1445,
  1465, 1499, 1515, 1538, 1569, 1590, 1617, 1643, 1663, 1690, 1716, 1734, 1769,
  -1, 1817, 1864, 1875, 1901, 1928, -1, 1990, 2027, 2047, 2066, -1, 2130, 2168,
  2195, 2214, 2232, 2390, 2642, 2917, 3200, 3490, 3764, 4056, 4355, 4665, 4998,
  5268, 5563, 5878, 6201, 6531, 6815, 7110, 7415, 7736, 8039, 8361, 8694, 9006,
  9334, 9637, 9936, 10256, 10576, 10907, 11236, 11562, 11853, 12145, 12469,
  12831, 13162, 13503, 13811, 14145, 14418, 16215, 19623, 23175, 26689, 30169,
  33702, 37381, 41138, 45057, 49116, 52911, 56768, 60866, 64944, 69086, 73476,
  77744, 81793, 86126, 90607, 95317, 99329, 103347, 107915, 113158, 117624,
  122041, 126713, 130298, 134106, 138066, 143179, 148090, 152546, 157577,
  161485, 165762, 170559, 175215, 179965, 183643, 187753, 192641, 196908,
  202058, 206255, 209765, 215975, 220529, 223269, 228130, 231986, 236254,
  241309, 244887, 249622, 254387, 258980, 263190, 265997, 269709, 274030,
  277803, 282205, 287746, 292461, 295843, 299973, 303921, 306930, 310910,
  314787, 318681, 324313, 328029, 331183, 335896, 339520, 342961, 346305,
  350432, 355262, 359026, 361562, 364765, 368463, 372636, 377106, 380129,
  383279, 386785, 390509, 393888, 397554, 401119,
];

var sc_ranks = [
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16, -1,
  17, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, 46, -1, 48, -1, -1, 54, -1, -1, -1, 56, -1, -1, -1, -1, -1, -1, 66,
  -1, -1, -1, 75, -1, -1, -1, -1, -1, -1, 87, 89, -1, 95, -1, -1, -1, -1, -1,
  105, -1, 107, 113, -1, -1, -1, 126, -1, 132, -1, -1, -1, -1, 144, -1, 151, -1,
  157, -1, 162, -1, -1, -1, -1, -1, -1, 182, 184, 191, -1, 217, 233, 258, 281,
  313, 345, 374, 405, 422, 471, 484, 517, 544, 578, 605, 639, 678, 723, 747,
  787, 824, 867, 894, 924, 980, 1006, 1049, 1082, 1118, 1185, 1205, 1253, 1301,
  1326, 1383, 1416, 1458, 1500, 1548, 1586, 1848, 2348, 2879, 3434, 4010, 4617,
  5275, 5934, 6679, 7470, 8233, 9043, 9878, 10726, 11560, 12444, 13333, 14154,
  15070, 16069, 17133, 17994, 18902, 19958, 21131, 22237, 23290, 24438, 25270,
  26137, 27074, 28323, 29548, 30614, 31849, 32810, 33880, 35067, 36252, 37448,
  38407, 39495, 40776, 41815, 43139, 44247, 45144, 46713, 47837, 48591, 49832,
  50844, 51969, 53245, 54202, 55491, 56820, 58037, 59209, 59969, 61005, 62088,
  63022, 64287, 65714, 66981, 67948, 69054, 70049, 70864, 71898, 72898, 73872,
  75471, 76568, 77354, 78609, 79553, 80589, 81544, 82669, 83915, 84977, 85668,
  86570, 87563, 88672, 89770, 90620, 91540, 92500, 93514, 94474, 95507, 96388,
];

var st_ranks = [
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, 12, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, 36, -1, -1, -1, -1, -1, 40, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 54, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 60, -1, 75, 84, -1, 97, -1, 108,
  125, -1, 141, 144, 154, 169, 172, 179, -1, -1, 199, 215, -1, 229, -1, 246,
  255, 271, 288, -1, -1, -1, 334, -1, -1, 359, 377, 386, 399, -1, 429, 438, 500,
  620, 743, 895, 1055, 1220, 1416, 1622, 1857, 2112, 2328, 2565, 2822, 3099,
  3393, 3713, 4006, 4312, 4672, 4969, 5329, 5626, 5953, 6321, 6756, 7160, 7595,
  8037, 8346, 8669, 9033, 9529, 10063, 10465, 10903, 11287, 11713, 12127, 12647,
  13127, 13477, 13893, 14393, 14817, 15350, 15748, 16083, 16756, 17238, 17548,
  18028, 18422, 18898, 19407, 19824, 20302, 20886, 21367, 21823, 22132, 22572,
  23021, 23404, 23905, 24513, 25025, 25414, 25947, 26249, 26610, 27018, 27466,
  27921, 28604, 28976, 29381, 29890, 30311, 30713, 31079, 31626, 32132, 32558,
  32889, 33264, 33736, 34203, 34689, 35111, 35508, 35884, 36385, 36852, 37327,
  37736,
];
