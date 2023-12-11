import { Modal, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import { DeleteWatchLater } from "../../api/apiWatchLaters";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

const ModalDeleteWatchLater = ({ id, onClose }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(watchLater);
  const [isPending, setIsPending] = useState(false);
  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const handleShow = () => setShow(true);

  const handleDeleteWatchLater = (id) => {
    setIsPending(true);
    DeleteWatchLater(id)
      .then((response) => {
        setIsPending(false);
        toast.success(response.message);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        toast.dark(JSON.stringify(err.message));
      });
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        <FaTrashAlt className="mx-1 mb-1" />
      </Button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Body>
          <Modal.Text>
            Apakah kamu yakin ingin menghapus ini dari watch later?
          </Modal.Text>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button
            variant="danger"
            type="submit"
            disabled={isPending}
            onClick={() => handleDeleteWatchLater(id)}
          >
            {isPending ? (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              <span>Hapus</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteWatchLater;
