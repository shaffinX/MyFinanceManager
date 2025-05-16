import axios from 'axios';
import Cookies from 'js-cookie';

export const AddBudget = async (category,amount,period) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}api/addBudget`, {category:category, amount:amount, period:period,email:Cookies.get('user_email')},{
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
        });
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error adding budget:', error);
        throw error;
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

export const deleteBudget = async (id) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API}api/delBudget/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
        });
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error deleting budget:', error);
        throw error;
    }
}

export const updateBudget = async (id, category, amount, period) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API}api/updateBudget/${id}`, { category, amount, period }, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
        });
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error updating budget:', error);
        throw error;
    }
}