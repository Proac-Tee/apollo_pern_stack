import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import React, { FC, FormEvent, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Form,
  FormControl,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { FaLocationArrow } from "react-icons/fa";
import {
  GET_CURRENT_USER,
  GET_POSTS,
  GET_SINGLE_USER_POST,
} from "../Graphql/Query";
import { BsThreeDots } from "react-icons/bs";
import { ADD_POST, DELETE_POST, UPDATE_POST } from "../Graphql/Mutation";
import { useAuth } from "../supabase/AuthProvider";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
// Custom toggle component
const CustomToggle = React.forwardRef<
  HTMLAnchorElement,
  { onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void }
>(({ onClick }, ref) => (
  <a
    href="#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <BsThreeDots size={20} />
  </a>
));

interface UserData {
  user: {
    id: string;
    username: string;
  };
}

interface Post {
  authorId: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
  username: string;
}

interface UpdatePostData {
  updatePost: {
    id: string;
    title: string;
    updatedAt: string;
  };
}

// Custom delete modal components
const DeletePostModal = ({
  onClose,
  onDeleteButtonClick,
  postId,
}: {
  onClose: () => void;
  onDeleteButtonClick: (postId: string) => void;
  postId: string;
}) => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Delete Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => onDeleteButtonClick(postId)}>
          Delete
        </Button>
      </Modal.Footer>
    </>
  );
};

const UpdatePostModal = ({
  onClose,
  onUpdateButtonClick,
  postId,
  title,
}: {
  onClose: () => void;
  onUpdateButtonClick: (title: string, postId: string) => void;
  postId: string;
  title: string;
}) => {
  const [upateTitle, setUpdateTitle] = useState<string>(title);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(e.target.value);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Update Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" value={upateTitle} onChange={handleTitleChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          onClick={() => onUpdateButtonClick(postId, upateTitle)}
          variant="primary"
        >
          Save changes
        </Button>
      </Modal.Footer>
    </>
  );
};

const ShowOtherUserPostModal = ({
  onClose,
  onShowOtherUserPostClick,
  postId,
  title,
}: {
  onClose: () => void;
  onShowOtherUserPostClick: (title: string, postId: string) => void;
  postId: string;
  title: string;
}) => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>See other posts from this author</Modal.Title>
      </Modal.Header>
      <Modal.Body>show for updating post goes here...</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          onClick={() => onShowOtherUserPostClick(title, postId)}
          variant="primary"
        >
          Save changes
        </Button>
      </Modal.Footer>
    </>
  );
};

const Dashbord: FC = () => {
  const { user } = useAuth();
  const [postData, setPostData] = useState<Post[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const [userId, setUserId] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<string | undefined>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleItemClick = (action: string, title: string, id: string) => {
    setShowModal(true);

    if (action === "Delete") {
      setModalContent(
        <DeletePostModal
          onClose={handleCloseModal}
          onDeleteButtonClick={handleDeleteButtonClick}
          postId={id}
        />
      );
    } else if (action === "Update") {
      setModalContent(
        <UpdatePostModal
          onUpdateButtonClick={handleUpdateButtonClick}
          onClose={handleCloseModal}
          postId={id}
          title={title}
        />
      );
    } else if (action === "See all posts of this author") {
      setModalContent(
        <ShowOtherUserPostModal
          onShowOtherUserPostClick={handleShowUserOtherPostClick}
          postId={id}
          title={title}
          onClose={handleCloseModal}
        />
      );
    }
  };

  // Query to fetch all posts
  const {
    loading: postsLoading,
    error: postsError,
    data: postsData,
  } = useQuery(GET_POSTS);

  const { loading: singleUserPost, error: singleUserPostsError } = useQuery(
    GET_SINGLE_USER_POST,
    {
      variables: { userId },
    }
  );

  const { data: userProfileData } = useQuery(GET_CURRENT_USER, {
    variables: { email: currentUser },
  });

  // post mutation
  const [addPost, { loading: postLoading, error: postError }] =
    useMutation(ADD_POST);

  // delete mutation
  const [deletePost, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_POST);

  // update mutation
  const [
    updatePost,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_POST);

  const chatMessageRef = useRef<HTMLInputElement>(null);

  const handleDeleteButtonClick = async (postId: string) => {
    // Perform delete action here

    try {
      if (postId) {
        // // Call the deletePost mutation function with the postId variable
        await deletePost({ variables: { deletePostId: postId } });
      }

      setPostData((prevData) => prevData.filter((post) => post.id !== postId));

      if (deleteError) {
        toast.error(deleteError.message);
        throw new Error("Error deleting message");
      }

      if (deleteLoading) {
        toast.loading("Deleting message...");
      }

      handleCloseModal(); // Close the modal after deletion
      toast.success(`Deleted post sucessfully`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdateButtonClick = async (postId: string, title: string) => {
    if (!title.trim()) {
      toast.error("Message cannot be empty");
      throw new Error("Message cannot be empty");
    }

    try {
      if (postId && title) {
        const posts = {
          id: postId,
          title: title,
        };

        // Call the deletePost mutation function with the postId variable
        await updatePost({ variables: { posts } });
      }

      // Assume updateData contains the response from useMutation hook
      if (updateData) {
        // Extract the updated post information from the updateData
        const rawPost: UpdatePostData = updateData;

        const updatedPost = rawPost.updatePost;

        toast.success("Successfully updated Message");

        if (updatedPost) {
          // Update the postData state with the updated title and updatedAt
          setPostData((prevData) =>
            prevData.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    title: updatedPost.title,
                    updatedAt: updatedPost.updatedAt,
                  }
                : post
            )
          );
        }

        if (updateError) {
          toast.error(updateError.message);
          throw new Error("An error occured");
        }
      }
    } catch (error) {
      toast.error("An error occured");
    } finally {
      handleCloseModal(); // Close the modal after deletion
    }
  };
  const handleShowUserOtherPostClick = async (id: string) => {
    try {
      if (id) {
        setUserId(id);

        if (singleUserPostsError) {
          toast.error(singleUserPostsError.message);

          throw new Error("Error Error fetching data");
        }

        toast.success("Sucessfully fetched data");
      }
    } catch (error) {
      toast.error("Error Fetching data");
    } finally {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (postsData) {
      setPostData(postsData.posts);
    }

    if (user) {
      setCurrentUser(user.email);
      setUserData(userProfileData);
    }
  }, [postsData, user, userProfileData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (chatMessageRef.current) {
        const chatMessageValue = chatMessageRef.current.value;

        if (!chatMessageRef.current.value) {
          toast.error("Message cannot be empty");
          throw new Error("Message cannot be empty");
        }

        // Assuming userData is of type UserData or possibly null/undefined
        if (userData && userData.user) {
          const newPost = {
            authorId: userData.user.id,
            title: chatMessageValue,
            username: userData.user.username,
          };

          await addPost({ variables: { posts: newPost } });

          // After adding the post, update the state with the new post
          setPostData((prevData: any) => [...prevData, newPost]);

          toast.success("message sent");
        }

        if (postError) {
          toast.error(postError.message);
          throw new Error(postError.message);
        }

        // Additional logic for form submission can be added here

        chatMessageRef.current.value = "";
      }
    } catch (error: unknown) {
      toast.error("Error posting data");
    }
  };

  const formatDate = (timestampString: string) => {
    if (!timestampString) {
      return "yet to update";
    }
    const timestamp = parseInt(timestampString, 10); // Convert string to number
    const formattedDate = new Date(timestamp).toLocaleString();
    return formattedDate; // Output: "4/27/2024" (depending on locale)
  };

  let username: string | null = null;

  if (user && userData && userData.user) {
    username = userData.user.username;
  }

  return (
    <section className="userListing_section">
      <section className="listing-table">
        <Table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Created At</th>
              <th>Post</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>

          {!postsLoading && !postsError && (
            <tbody>
              {postData.map((post) => (
                <tr key={post.id}>
                  <td>{post.username}</td>
                  <td>{formatDate(post.createdAt)}</td>
                  <td>{post.title}</td>
                  <td>{formatDate(post.updatedAt)}</td>
                  {username === post.username ? (
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          as={CustomToggle}
                          id="dropdown-custom-components"
                        >
                          <BsThreeDots size={20} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              handleItemClick("Delete", post.title, post.id)
                            }
                          >
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              handleItemClick("Update", post.title, post.id)
                            }
                          >
                            Update
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              handleItemClick(
                                "See all posts of this author",
                                post.authorId,
                                post.title
                              )
                            }
                          >
                            See all posts of this author
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  ) : (
                    <td>
                      <p> &#128512;</p>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          )}
        </Table>
        {postsLoading && <p>Loading posts...</p>}
        {singleUserPost && <p>Loading update...</p>}
        {postsError && <p>Error loading posts</p>}
        {updateLoading && <p>Loading update...</p>}
      </section>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>{modalContent}</Modal.Body>
      </Modal>
      {user ? (
        <section>
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center">
              <Col>
                <FormControl
                  ref={chatMessageRef}
                  required
                  type="text"
                  name="chatMessage"
                  placeholder="Chat Message"
                />
              </Col>
              <Col xs="auto">
                <Button
                  disabled={postLoading}
                  className="buttonChat"
                  type="submit"
                >
                  <FaLocationArrow size={22} />
                </Button>
              </Col>
            </Row>
          </Form>
        </section>
      ) : (
        <div className="call_to_action">
          <p>Please Login to be able to perfrom mutation operations</p>
        </div>
      )}
    </section>
  );
};

export default Dashbord;
