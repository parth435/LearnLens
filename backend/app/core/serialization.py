def serialize_model(model):
    if model is None:
        return None
    if isinstance(model, dict):
        return model
    if isinstance(model, (list, tuple, set)):
        return [serialize_model(item) for item in model]
    return {column.name: getattr(model, column.name) for column in model.__table__.columns}


def serialize_list(models):
    return [serialize_model(item) for item in models]
