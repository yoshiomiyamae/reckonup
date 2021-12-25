import re
import os


def camel_to_snake(text):
    return re.sub(
        "([A-Z])",
        lambda x: f"_{x.group(1).lower()}",
        text[0].lower() + text[1:]
    )


def snake_to_camel(text):
    return re.sub("_(.)", lambda x: x.group(1).upper(), text)


def get_files(
    root_directory_path,
    mode='files',
    recursive=True,
    include_hidden=True
):
    if recursive:
        for path, directories, files in os.walk(root_directory_path):
            if mode == 'files':
                for file_name in files:
                    if include_hidden or file_name[0] != '.':
                        yield path, file_name
            elif mode == 'directories':
                for directory_name in directories:
                    if include_hidden or directory_name[0] != '.':
                        yield path, directory_name
    else:
        path, directories, files = next(os.walk(root_directory_path))
        if mode == 'files':
            for file_name in files:
                if include_hidden or file_name[0] != '.':
                    yield path, file_name
        elif mode == 'directories':
            for directory_name in directories:
                if include_hidden or directory_name[0] != '.':
                    yield path, directory_name
