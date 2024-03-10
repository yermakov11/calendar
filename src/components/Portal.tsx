import { PortalWrapper } from '../style/Calendar.styled';
interface PortalProps {
      title: string;
      date: Date;
      handleDelete: () => void;
      handlePotalClose: () => void;
      handlePortalEdit: ()=> void;
}

export const Portal=({title,date,handleDelete,handlePotalClose,handlePortalEdit}:PortalProps) => {
      return (
        <PortalWrapper>
          <h2>{title}</h2>
          <p>{date.toDateString()}</p>
          <button onClick={handleDelete} name="trash-outline">Delete</button>
          <button onClick={handlePotalClose} name="close-outline">Close</button>
          <button onClick={handlePortalEdit} name='edit-outline'>Edit</button>
        </PortalWrapper>
      );
};
