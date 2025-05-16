import axios from "axios";
import Cookies from "js-cookie";
export const handleAddExpense = async (title,amount,category,date,receipt) => {
    const email = Cookies.get('user_email')
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API}api/AddExpense`,
            { title, amount, date, category,email,receipt},
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        );
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error adding expense:", error);
        return false;
    }
}

export const getExpenses = async () => {
    const email = Cookies.get('user_email')
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API}api/getExpense`,
            { email },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        );
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return [];
    }
}

export const deleteExpense = async (id) => {
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_API}api/delExpense/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        );
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error deleting expense:", error);
        return false;
    }
}

export const getExpenseById = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API}api/getExpense/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        );
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching expense:", error);
        return null;
    }
}

export const updateExpense = async (id, title, amount, category, date) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_API}api/updateExpense/${id}`,
            { title, amount, category, date },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            }
        );
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error updating expense:", error);
        return false;
    }

}