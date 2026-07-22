import PropTypes from 'prop-types';

// third party
import { FormikProvider } from 'formik';

// ==============================|| APP FORM WRAPPER ||============================== //

export default function AppForm({ form, children }) {
  return (
    <FormikProvider value={form.formik}>
      <form onSubmit={form.formik.handleSubmit} noValidate>
        {children}
      </form>
    </FormikProvider>
  );
}

AppForm.propTypes = { form: PropTypes.object, children: PropTypes.node };
