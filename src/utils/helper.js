import moment from "moment";

//This function checks if a given email address is valid based on a regular expression (regex) pattern
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";
    
    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i] [0];
    }
    return initials.toUpperCase();
};
// ^ → Start of string

// [^\s@]+ → One or more characters that are not whitespace (\s) or @

// @ → Exactly one @ symbol

// [^\s@]+ → One or more characters (again not whitespace or @) after @

// \. → A literal dot . (escaped with a backslash)

// [^\s@]+ → One or more characters (e.g., com, org)

// $ → End of string

export const addThousandsSeperator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".")
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

    return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};
// \B	Not at a word boundary

// (?=(\d{3})+(?!\d))	Look ahead for groups of 3 digits not followed by more digits

// .replace(..., ",")	Insert commas at those positions

export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }));

    return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b)=> new Date(a.Date) - new Date(b.Date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        source: item?.source,
    }))

    return chartData;
};

export const prepareExpenseLineChartData=(data=[])=>{
const sortedData=[...data].sort((a,b)=>new Date(a.date)-new Date(b.date));
const chartData=sortedData.map((item)=>({
  date:moment(item?.date).format('Do MMM'),
  amount:item?.amount,
  category:item?.category,
    

}))
return chartData;
};