const cTable = require('console.table');
const yup = require('yup');

exports.formatTemplateToPrompterForMake = (template) => {
  return template.map((item) => {
    return {
      title: item.text,
      value: item.id,
    };
  });
};

exports.formatTemplateToPrompterForUpdate = (template, types) => {
  return template.map((item) => {
    const result = {
      title: item.text,
      value: item.id,
    };
    if (types.includes(item.id)) result.selected = true;
    return result;
  });
};

exports.formatList = (list) => {
  const tableContents = [];
  list.forEach((item) => {
    tableContents.push({
      alias: item.alias,
      types: item.types.join(' '),
    });
  });

  return cTable.getTable(tableContents);
};

exports.validateSchema = async (data) => {
  const schema = yup.object().shape({
    alias: yup.string().required(),
    types: yup.array().required().of(yup.string()).min(1),
  });

  const valid = await schema.isValid(data);
  if (!valid) {
    throw new Error(
        'Data is not valid, it must contain at least one Operating System, IDE or Programming Language'
    );
  }
};
