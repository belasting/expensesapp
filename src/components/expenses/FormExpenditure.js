import React, { useEffect, useState } from 'react'
import { FiltersContainer, LargeInput, ButtonContainer, Form, Input } from '../elements/ElementsOfForm';
import Button from '../elements/Button';
import { ReactComponent as IconPlus } from '../../images/plus.svg';
import { ReactComponent as IconEdit } from '../../images/editar.svg';
import SelectCategories from './SelectCategories';
import DatePicker from '../Date/DatePicker';
import addExpenditure from '../../firebase/addExpenditure';
import editExpenditure from '../../firebase/editExpenditure';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import { useAuth } from '../../context/AuthContext';
import Alert from '../elements/Alert';
import { useNavigate } from 'react-router-dom';

const FormExpenditure = ({ expense }) => {

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('hogar');
  const [date, setDate] = useState(new Date());
  const { user } = useAuth();
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (expense) {
      if (expense.uidUser === user.uid) {
        setDescription(expense.description);
        setAmount(String(expense.amount));
        setCategory(expense.category);
        setDate(fromUnixTime(expense.date));
      } else {
        navigate('expenses-list');
      }
    }
  }, [expense, user, navigate]);

  const handleChangeAmount = (e) => {
    setAmount(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let amountConverted = parseFloat(amount).toFixed(2);

    if (description.trim() === '' || amount.trim() === '') {
      if (!amountConverted) {
        setAlert({
          type: 'error',
          message: 'Please, add a valid amount'
        });
        return;
      }
      setAlert({
        type: 'error',
        message: 'Please, add description or amount'
      });
      return;
    }

    try {
      if (expense) {
        await editExpenditure({
          id: expense.id,
          description,
          amount: amountConverted,
          category,
          date: getUnixTime(date),
          uidUser: user.uid
        });
        navigate('/expenses-list');
      } else {
        await addExpenditure({
          description,
          amount: amountConverted,
          category,
          date: getUnixTime(date),
          uidUser: user.uid
        });
      }

      setDescription('');
      setAmount('');
      setCategory('hogar');
      setDate(new Date());
      setAlert({
        type: 'success',
        message: 'Expenditure added successfully'
      });

    } catch (error) {
      console.log(error);
      setAlert({
        type: 'error',
        message: 'There was an error, try again'
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FiltersContainer>
        <SelectCategories category={category} setCategory={setCategory} />
        <DatePicker date={date} setDate={setDate} />
      </FiltersContainer>

      <div>
        <Input
          type="text"
          placeholder="Description"
          name="description"
          id='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <LargeInput
          type="text"
          placeholder="$0.00"
          name="amount"
          id='amount'
          value={amount}
          onChange={handleChangeAmount}
        />
      </div>

      <ButtonContainer>
        <Button as="button" primary conIcono type="submit">
          {expense ? (
            <>
              Edit Expenditure
              <IconEdit />
            </>
          ) : (
            <>
              Add Expenditure
              <IconPlus />
            </>
          )}
        </Button>
      </ButtonContainer>

      {alert.message && <Alert
        type={alert.type}
        message={alert.message}
        alertState={alert}
        changeAlertState={setAlert}
      />}
    </Form>
  );
}

export default FormExpenditure;