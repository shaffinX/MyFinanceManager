import axios from 'axios';
import Cookies from 'js-cookie';
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
export const GetBudgets = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}api/getBudget`, {email:Cookies.get('user_email')},{
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching budgets:', error);
        throw error;
    }
}

export const addSavingsMonth = async (savings, currentMonthShort) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API}api/addSavings`,
            { email: Cookies.get('user_email'), savings:savings, month: currentMonthShort },
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
        console.error("Error adding savings:", error);
        return [];
    }
}

export const getSavingsYear = async () => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API}api/getSavings`,
            { email: Cookies.get('user_email') },
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
        console.error("Error fetching savings:", error);
        return [];
    }
}