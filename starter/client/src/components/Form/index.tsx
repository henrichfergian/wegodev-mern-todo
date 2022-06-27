import { postTodo } from 'api/postTodo';
import CloseSvgComponent from 'assets/svg/close';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryCache } from 'react-query';
import { Transition } from 'react-transition-group';
import { getErrorMessage } from 'utils';

type Props = {
  inProp: boolean;
  onClose: () => void;
};

type Inputs = {
  title: string;
  status: 'completed' | 'uncompleted';
};

const DURATION = 240;

const formDefaultStyle = {
  trasition: `bottom ${DURATION}ms ease-in-out, opacity ${DURATION}ms ease-in-out`,
  opacity: 0,
  bottom: '-180px',
};

const formTransitionStyles = {
  unmounted: { opacity: 0, bottom: '-180px' },
  entering: { opacity: 1, bottom: 0 },
  entered: { opacity: 1, bottom: 0 },
  exiting: { opacity: 0, bottom: '-180px' },
  exited: { opacity: 0, bottom: '-180px' },
};

const overlayDefaultStyle = {
  transition: `bottom ${DURATION}ms ease-in-out, opacity ${
    DURATION * 2
  }ms ease-in-out`,
  opacity: 0,
  display: 'none',
};

const overlayTransitionStyles = {
  unmounted: { opacity: 0, bottom: '-180px' },
  entering: { opacity: 0.85, display: 'block' },
  entered: { opacity: 0.85, display: 'block' },
  exiting: { opacity: 0, bottom: '-180px' },
  exited: { opacity: 0, bottom: '-180px' },
};

const Form: React.FC<Props> = ({ inProp, onClose }) => {
  const cache = useQueryCache();
  const { register, handleSubmit, errors, reset } = useForm<Inputs>();

  const [mutate] = useMutation(postTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos');
    },
  });

  const onSubmit = async (data: Inputs): Promise<void> => {
    try {
      await mutate(data);
      reset();
      onClose();
    } catch (error) {
      getErrorMessage(error);
    }
  };

  const handleOnClose = () => {
    reset();
    onClose();
  };

  const placeholderStyle = classNames(
    'text-darkPurple flex-1 bg-transparent outline-none',
    {
      'placeholder-red-400': errors.title,
    }
  );

  const formStyle = classNames(
    'flex justify-center items-center bg-gray-200 px-4 py-2 rounded-lg box-border',
    {
      'bg-red-200': errors.title,
    }
  );

  return (
    <Transition in={inProp} timeout={DURATION}>
      {(state) => (
        <>
          <div
            onClick={onClose}
            style={{
              ...overlayDefaultStyle,
              ...overlayTransitionStyles[state],
            }}
            className="fixed z-10 left-0 top-0 bottom-0 right-0 bg-black"
          />

          <div
            className="fixed flex flex-col z-10 inset-x-0 rounded-t-lg p-4 h-32 bg-white"
            style={{
              ...formDefaultStyle,
              ...formTransitionStyles[state],
            }}
          >
            <form className={formStyle} onSubmit={handleSubmit(onSubmit)}>
              <input
                name="title"
                placeholder={errors.title ? 'Oops!...' : 'task'}
                className={placeholderStyle}
                ref={register({
                  required: {
                    value: true,
                    message: 'This field is required!',
                  },
                  minLength: {
                    value: 8,
                    message: 'Minimun character is 8!',
                  },
                  maxLength: {
                    value: 30,
                    message: 'No more than 30 characters!',
                  },
                })}
              />
              <input
                name="status"
                defaultValue="uncompleted"
                className="hidden"
                ref={register}
              />

              {errors.title ? (
                <button
                  className="bg-transparent outline-none text-base font-bold text-darkPurple ml-1"
                  onClick={() => {
                    reset();
                  }}
                >
                  Reset
                </button>
              ) : (
                <input
                  type="submit"
                  value="Add"
                  className="bg-transparent outline-none text-base font-bold text-darkPurple ml-1"
                />
              )}
            </form>

            {errors.title && (
              <span className="text-xs text-red-500 font-semibold tracking-wide mt-2 pl-1">
                {errors?.title?.message}
              </span>
            )}

            <span
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                bottom: '10px',
                left: '50%',
              }}
            >
              <CloseSvgComponent onClick={handleOnClose} />
            </span>
          </div>
        </>
      )}
    </Transition>
  );
};

export default Form;
