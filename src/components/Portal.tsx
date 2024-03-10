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
          <button onClick={handleDelete} className='portal-button-delete'>Delete</button>
          <button onClick={handlePotalClose}className='portal-button-close'>Close</button>
          <button onClick={handlePortalEdit} className='portal-button-edit'>Edit</button>
        </PortalWrapper>
      );
};
